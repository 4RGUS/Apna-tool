"use client";

import React, { useState } from "react";
import { Card } from "../../../../components/Card";
import { BackLink } from "../../../../components/BackLink";

const sampleJson = `{
  "name": "Ada Lovelace",
  "role": "Developer",
  "skills": ["javascript", "python"],
  "active": true
}`;

export default function JsonEditorPage() {
  const [input, setInput] = useState(sampleJson);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setInput(formatted);
      setError("");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to format JSON input.";
      setError(message);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(input);
      setStatusMessage("Copied to clipboard.");
      setError("");
      setTimeout(() => setStatusMessage(""), 2000);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Copy failed. Please try again.";
      setStatusMessage(message);
    }
  };

  const handleSave = () => {
    try {
      const blob = new Blob([input], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "json-editor.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setStatusMessage("Saved as json-editor.json");
      setError("");
      setTimeout(() => setStatusMessage(""), 2000);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Save failed. Please try again.";
      setStatusMessage(message);
    }
  };

  return (
    <div className="space-y-6">
      <BackLink href="/developer-tools" label="Back to developer tools" />
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          JSON Editor & Formatter
        </h1>
        <p className="text-sm text-gray-400">
          Paste or type any JSON, then format it with a single click.
        </p>
      </div>

      <Card title="JSON input">
        <div className="space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[320px] w-full resize-y rounded-lg border border-gray-800 bg-gray-950 px-3 py-3 font-mono text-sm text-gray-100 outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
            spellCheck={false}
            aria-label="JSON input"
          />

          {error && (
            <p className="rounded-lg border border-red-900/50 bg-red-900/20 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-400">
              {statusMessage || "\u00a0"}
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="rounded-lg border border-gray-800 px-4 py-2 text-sm font-semibold text-gray-100 transition hover:border-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Copy JSON
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-lg border border-gray-800 px-4 py-2 text-sm font-semibold text-gray-100 transition hover:border-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Save JSON
              </button>
              <button
                type="button"
                onClick={handleFormat}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Format JSON
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
