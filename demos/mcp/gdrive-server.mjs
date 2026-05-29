/**
 * Google Drive MCP Server
 *
 * A custom MCP server that wraps rclone to upload files to personal Google Drive.
 * Registered with: claude mcp add gdrive node /path/to/gdrive-server.mjs
 *
 * Tools exposed:
 *   upload_to_drive  — copy a local file to a Google Drive folder
 *   list_drive       — list files/folders in a Drive path
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { execFileSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

// ── rclone config ─────────────────────────────────────────────────────────────

const RCLONE   = path.join(os.homedir(), 'bin', 'rclone');
const REMOTE   = 'gdrive';          // must match name given during rclone config

function rclone(args, timeoutMs = 30_000) {
  return execFileSync(RCLONE, args, {
    encoding: 'utf8',
    timeout: timeoutMs,
    env: { ...process.env, HOME: os.homedir() },
  }).trim();
}

// ── Server setup ──────────────────────────────────────────────────────────────

const server = new Server(
  { name: 'gdrive', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

// ── Tool definitions ──────────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'upload_to_drive',
      description: 'Upload a local file to Google Drive. Returns the destination path.',
      inputSchema: {
        type: 'object',
        properties: {
          file_path: {
            type: 'string',
            description: 'Absolute path to the local file to upload',
          },
          destination: {
            type: 'string',
            description: 'Folder path inside Google Drive (e.g. "claude-learning/weather"). Defaults to root.',
            default: '',
          },
        },
        required: ['file_path'],
      },
    },
    {
      name: 'list_drive',
      description: 'List files and folders at a Google Drive path.',
      inputSchema: {
        type: 'object',
        properties: {
          drive_path: {
            type: 'string',
            description: 'Folder path to list inside Google Drive. Defaults to root.',
            default: '',
          },
        },
      },
    },
  ],
}));

// ── Tool handlers ─────────────────────────────────────────────────────────────

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args } = req.params;

  if (name === 'upload_to_drive') {
    const filePath   = args.file_path;
    const dest       = args.destination ?? '';

    if (!fs.existsSync(filePath)) {
      return { content: [{ type: 'text', text: `Error: file not found: ${filePath}` }], isError: true };
    }

    const fileName   = path.basename(filePath);
    const remoteDest = dest ? `${REMOTE}:${dest}` : `${REMOTE}:`;

    try {
      rclone(['copy', filePath, remoteDest, '--progress'], 60_000);
      const drivePath = dest ? `${dest}/${fileName}` : fileName;
      return {
        content: [{
          type: 'text',
          text: `Uploaded successfully.\nFile: ${fileName}\nDrive path: ${drivePath}\nView at: https://drive.google.com`,
        }],
      };
    } catch (err) {
      return {
        content: [{ type: 'text', text: `Upload failed: ${err.message}` }],
        isError: true,
      };
    }
  }

  if (name === 'list_drive') {
    const drivePath = args.drive_path ?? '';
    const remote    = drivePath ? `${REMOTE}:${drivePath}` : `${REMOTE}:`;

    try {
      const output = rclone(['lsf', remote, '--dirs-only=false']);
      const lines  = output ? output.split('\n').filter(Boolean) : [];
      return {
        content: [{
          type: 'text',
          text: lines.length
            ? `Contents of "${drivePath || '/'}":\n${lines.map(l => `  ${l}`).join('\n')}`
            : `"${drivePath || '/'}" is empty.`,
        }],
      };
    } catch (err) {
      return {
        content: [{ type: 'text', text: `List failed: ${err.message}` }],
        isError: true,
      };
    }
  }

  return {
    content: [{ type: 'text', text: `Unknown tool: ${name}` }],
    isError: true,
  };
});

// ── Start ─────────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
