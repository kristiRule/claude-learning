import { test, expect, vi, afterEach, beforeAll } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import React from "react";
import { MainContent } from "@/app/main-content";

// Polyfill ResizeObserver for jsdom
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

vi.mock("@/lib/contexts/file-system-context", () => ({
  FileSystemProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useFileSystem: () => ({
    fileSystem: null,
    getAllFiles: () => new Map(),
    refreshTrigger: 0,
    selectedFile: null,
    setSelectedFile: vi.fn(),
    handleToolCall: vi.fn(),
  }),
}));

vi.mock("@/lib/contexts/chat-context", () => ({
  ChatProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

vi.mock("@/components/chat/ChatInterface", () => ({
  ChatInterface: () => <div data-testid="chat-interface">Chat</div>,
}));

vi.mock("@/components/editor/FileTree", () => ({
  FileTree: () => <div data-testid="file-tree">FileTree</div>,
}));

vi.mock("@/components/editor/CodeEditor", () => ({
  CodeEditor: () => <div data-testid="code-editor">CodeEditor</div>,
}));

vi.mock("@/components/preview/PreviewFrame", () => ({
  PreviewFrame: () => <div data-testid="preview-frame">Preview</div>,
}));

vi.mock("@/components/HeaderActions", () => ({
  HeaderActions: () => <div>Actions</div>,
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

test("shows preview by default", () => {
  render(<MainContent />);
  expect(screen.getByTestId("preview-frame")).toBeDefined();
  expect(screen.queryByTestId("code-editor")).toBeNull();
  expect(screen.queryByTestId("file-tree")).toBeNull();
});

test("clicking Code tab switches to code view", () => {
  render(<MainContent />);

  const codeTab = screen.getByRole("tab", { name: "Code" });
  fireEvent.click(codeTab);

  expect(screen.queryByTestId("preview-frame")).toBeNull();
  expect(screen.getByTestId("code-editor")).toBeDefined();
  expect(screen.getByTestId("file-tree")).toBeDefined();
});

test("clicking Preview tab switches back to preview view", () => {
  render(<MainContent />);

  // Switch to code first
  fireEvent.click(screen.getByRole("tab", { name: "Code" }));
  expect(screen.getByTestId("code-editor")).toBeDefined();

  // Switch back to preview
  fireEvent.click(screen.getByRole("tab", { name: "Preview" }));
  expect(screen.getByTestId("preview-frame")).toBeDefined();
  expect(screen.queryByTestId("code-editor")).toBeNull();
});

test("toggle buttons switch between views repeatedly", () => {
  render(<MainContent />);

  // Start: preview
  expect(screen.getByTestId("preview-frame")).toBeDefined();

  // -> code
  fireEvent.click(screen.getByRole("tab", { name: "Code" }));
  expect(screen.getByTestId("code-editor")).toBeDefined();

  // -> preview
  fireEvent.click(screen.getByRole("tab", { name: "Preview" }));
  expect(screen.getByTestId("preview-frame")).toBeDefined();

  // -> code again
  fireEvent.click(screen.getByRole("tab", { name: "Code" }));
  expect(screen.getByTestId("code-editor")).toBeDefined();

  // -> preview again
  fireEvent.click(screen.getByRole("tab", { name: "Preview" }));
  expect(screen.getByTestId("preview-frame")).toBeDefined();
});

test("Preview tab is active by default", () => {
  render(<MainContent />);
  const previewTab = screen.getByRole("tab", { name: "Preview" });
  expect(previewTab.getAttribute("data-state")).toBe("active");
  const codeTab = screen.getByRole("tab", { name: "Code" });
  expect(codeTab.getAttribute("data-state")).toBe("inactive");
});

test("Code tab becomes active after clicking it", () => {
  render(<MainContent />);
  fireEvent.click(screen.getByRole("tab", { name: "Code" }));
  const codeTab = screen.getByRole("tab", { name: "Code" });
  expect(codeTab.getAttribute("data-state")).toBe("active");
  const previewTab = screen.getByRole("tab", { name: "Preview" });
  expect(previewTab.getAttribute("data-state")).toBe("inactive");
});
