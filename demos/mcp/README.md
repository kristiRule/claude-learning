# Google Drive MCP Server

A custom MCP server that uploads files to Google Drive using rclone.
Built as a Claude Code learning demo — exposes `upload_to_drive` and `list_drive` tools.

---

## How it works

Claude Code launches `gdrive-server.mjs` as a subprocess and communicates with it over
stdin/stdout using the MCP protocol (JSON-RPC). When you ask Claude to upload a file,
it calls the `upload_to_drive` tool, which runs rclone under the hood.

---

## One-time setup

### 1. Install rclone

```bash
mkdir -p ~/bin
curl -sL "https://downloads.rclone.org/v1.74.2/rclone-v1.74.2-linux-amd64.zip" -o /tmp/rclone.zip
unzip -j /tmp/rclone.zip "*/rclone" -d ~/bin
chmod +x ~/bin/rclone
~/bin/rclone version
```

### 2. Create a Google Cloud project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click the project dropdown at the top and choose **New Project**
3. Name it anything (e.g. `rclone-personal`) and click **Create**
4. Wait for the notification that it is ready, then make sure it is selected

### 3. Enable the Google Drive API

1. In the search bar at the top type **Google Drive API** and click the result
2. Click the blue **Enable** button

### 4. Configure the OAuth consent screen

1. In the left sidebar click **Audience** (or **OAuth consent screen** in older UI)
2. Choose **External** and click **Create**
3. Fill in only the required fields:
   - App name: `rclone`
   - User support email: your Gmail address
4. Click **Next** through steps 2, 3, 4 without adding anything
5. Click **Create**
6. Scroll down to **Test users**, click **Add users**, add your Gmail address, click **Save**

### 5. Create OAuth credentials

1. In the left sidebar click **Clients** (or **Credentials**)
2. Click **+ Create Client** (or **+ Create Credentials > OAuth client ID**)
3. Application type: **Desktop app**
4. Name: `rclone-desktop`
5. Click **Create**
6. In the popup click **Download JSON** — save it somewhere accessible
7. Click **OK**

### 6. Configure rclone

Pull your client ID and secret from the downloaded JSON:

```bash
python3 -c "
import json
d = json.load(open('~/Downloads/client_secret_*.json'))
c = d['installed']
print('client_id:    ', c['client_id'])
print('client_secret:', c['client_secret'])
"
```

Then run rclone config:

```bash
~/bin/rclone config
```

Follow these prompts:

```
e/n/d/r/c/s/q> n

name> gdrive

Storage type: choose drive (Google Drive)

client_id> paste your client ID here
client_secret> paste your client secret here

scope> 1   (full access)

root_folder_id> [Enter]
service_account_file> [Enter]

Edit advanced config? n
Use auto config? y
```

A browser window opens. Sign in with your Google account and click **Allow**.
Back in the terminal:

```
Configure as team drive? n
y
q
```

Verify the connection:

```bash
~/bin/rclone lsf gdrive: --max-depth 1
```

You should see your Drive files listed.

### 7. Install the MCP SDK

From the project root:

```bash
npm install @modelcontextprotocol/sdk
```

### 8. Register the MCP server with Claude Code

```bash
claude mcp add gdrive node /home/kristi/Desktop/claude-learning/demos/mcp/gdrive-server.mjs
```

Verify it connected:

```bash
claude mcp list
```

You should see `gdrive: ... connected`.

---

## Usage

Once registered, ask Claude Code in any conversation:

```
Upload demos/weather/weather-modification-deck-v2.pptx to my Google Drive
in a folder called claude-learning.
```

Claude will call the `upload_to_drive` tool directly.

You can also call the tools manually to test:

```bash
# Upload a file
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"upload_to_drive","arguments":{"file_path":"/absolute/path/to/file.pptx","destination":"folder-name"}}}' \
  | node demos/mcp/gdrive-server.mjs

# List Drive contents
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"list_drive","arguments":{"drive_path":""}}}' \
  | node demos/mcp/gdrive-server.mjs
```

---

## Tools

| Tool | Parameters | Description |
|------|-----------|-------------|
| `upload_to_drive` | `file_path` (required), `destination` (optional) | Copies a local file to Google Drive |
| `list_drive` | `drive_path` (optional) | Lists files at a Drive path |

---

## Notes

- rclone tokens are stored in `~/.config/rclone/rclone.conf` and refresh automatically
- The GCP project can stay on the free tier with no billing attached
- The OAuth consent screen stays in "Testing" mode which is fine for personal use — tokens last 7 days and refresh automatically via rclone
- If you ever get an auth error, run `~/bin/rclone config reconnect gdrive:` to re-authorize
