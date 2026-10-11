// ==UserScript==
// @name         ChatGPT Archive
// @namespace    treexxeexx
// @version      0.2.7
// @author       treexxeexx
// @description  Archive complete ChatGPT conversations, branches, and first-party attachments.
// @license      MIT
// @icon         https://chatgpt.com/favicon.ico
// @downloadURL  https://raw.githubusercontent.com/treexxeexx/chatgpt-archive/main/chatgpt-archive.user.js
// @updateURL    https://raw.githubusercontent.com/treexxeexx/chatgpt-archive/main/chatgpt-archive.user.js
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @grant        GM_addStyle
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(a=>{if(typeof GM_addStyle=="function"){GM_addStyle(a);return}const e=document.createElement("style");e.textContent=a,document.head.append(e)})(" #chatgpt-archive-root{position:relative;z-index:2147483647;display:flex;flex:0 0 auto;align-items:center;color:var(--color-text-tertiary, currentColor);font:13px/1.45 ui-sans-serif,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif}#chatgpt-archive-root[data-docked=false]{display:none}#chatgpt-live-stream-root[data-docked=true]+#chatgpt-archive-root{margin-inline-start:-8px}#chatgpt-archive-root button{border:0;border-radius:9px;cursor:pointer;font:inherit}#chatgpt-archive-root button:disabled{cursor:not-allowed;opacity:.45}.cga-launch{position:relative;display:inline-flex;width:36px;height:36px;align-items:center;justify-content:center;padding:0;background:transparent;color:inherit}.cga-launch:hover,.cga-launch:focus-visible{background:var(--token-interactive-bg-secondary-hover, rgb(0 0 0 / .08))}.cga-launch svg{display:block}.cga-launch:after{position:absolute;bottom:calc(100% + 8px);left:50%;z-index:2147483647;padding:5px 8px;border-radius:6px;background:#171717;color:#fff;content:attr(data-tooltip);font-size:12px;line-height:1;opacity:0;pointer-events:none;transform:translate(-50%) translateY(3px);transition:opacity .12s ease,transform .12s ease;white-space:nowrap}.cga-launch:hover:after,.cga-launch:focus-visible:after{opacity:1;transform:translate(-50%) translateY(0)}.cga-panel{position:fixed;inset:auto auto 72px 8px;margin:0;z-index:2147483647;box-sizing:border-box;display:flex;width:min(620px,calc(100vw - 16px));max-height:calc(100vh - 88px);flex-direction:column;padding:16px;overflow-y:auto;overscroll-behavior:contain;border:1px solid #d1d5db;border-radius:14px;background:#fff;color:#1f2937;box-shadow:0 15px 45px #0003}.cga-panel:not(:popover-open){display:none}.cga-panel>*{flex:0 0 auto}.cga-head,.cga-toolbar,.cga-selection-toolbar,.cga-actions{display:flex;align-items:center;gap:8px}.cga-head{justify-content:space-between}.cga-head strong{font-size:15px}.cga-toolbar{flex-wrap:wrap;margin-top:12px;padding:8px 0;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb}.cga-source,.cga-search{min-width:0;padding:6px 8px;border:1px solid #d1d5db;border-radius:7px;background:#fff;color:inherit;font:inherit}.cga-source{max-width:210px}.cga-source-loading{display:inline-flex;align-items:center;gap:5px;color:#6b7280;font-size:12px;white-space:nowrap}.cga-source-loading[hidden]{display:none}.cga-spinner{width:13px;height:13px;border:2px solid #d1d5db;border-top-color:#10a37f;border-radius:50%;animation:cga-spin .7s linear infinite}@keyframes cga-spin{to{transform:rotate(360deg)}}.cga-search{flex:1 1 160px}.cga-toolbar-meta{display:flex;flex:1 0 100%;align-items:center;justify-content:space-between;gap:8px}.cga-version{color:#6b7280;font-size:12px;font-variant-numeric:tabular-nums;white-space:nowrap}.cga-search-help{display:flex;flex:1 0 100%;align-items:center;gap:5px;color:#6b7280;font-size:11px}.cga-copy-separator{padding:2px 7px;background:#e5e7eb;color:#111827;font-weight:600;-webkit-user-select:all;user-select:all}.cga-selection-toolbar{flex-wrap:wrap;padding:8px 2px}.cga-selection-toolbar label{display:inline-flex;align-items:center;gap:6px;cursor:pointer}.cga-selected-count{margin-left:auto;color:#6b7280}.cga-check-updates{padding:4px 8px;background:#e5e7eb;color:#111827}.cga-local-status{color:#6b7280;font-size:11px;white-space:nowrap}.cga-refresh{margin-left:auto;padding:5px 9px;background:#e5e7eb;color:#111827}.cga-list-header,.cga-conversation{display:grid;min-width:0;grid-template-columns:15px minmax(0,1fr) 76px 76px 76px;align-items:center;gap:9px}.cga-list-header{padding:5px 8px;color:#6b7280;font-size:11px}.cga-list-header button{overflow:hidden;padding:2px 0;background:transparent;color:inherit;font-size:inherit;text-align:left;text-overflow:ellipsis;white-space:nowrap}.cga-list-header .cga-sort-active{color:#047857;font-weight:600}.cga-selection-list{min-height:96px;flex:1 1 auto;overflow:auto;overscroll-behavior:contain;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb}.cga-list-message{margin:18px 0;color:#6b7280;text-align:center}.cga-list-error{color:#b91c1c}.cga-conversation{padding:7px 8px;border-radius:8px;cursor:pointer}.cga-conversation:hover{background:#f3f4f6}.cga-conversation-needs-download{background:#fffbeb}.cga-conversation-needs-download:hover{background:#fef3c7}.cga-conversation-title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.cga-conversation-date{overflow:hidden;color:#6b7280;font-size:10.5px;text-overflow:ellipsis;white-space:nowrap}.cga-conversation-date.cga-date-active{color:#047857}.cga-local-date.cga-local-needs-download{color:#b45309;font-weight:600}#chatgpt-archive-root input[type=checkbox]{width:15px;height:15px;flex:0 0 auto;-webkit-appearance:auto;-moz-appearance:auto;appearance:auto;accent-color:#10a37f}.cga-page-actions{display:flex;justify-content:center;gap:8px;margin-top:10px}.cga-page-actions button{padding:6px 12px;background:#e5e7eb;color:#111827}.cga-page-actions button[hidden]{display:none}.cga-close{width:28px;height:28px;background:transparent;color:inherit;font-size:20px!important}.cga-actions{flex-wrap:wrap;margin:12px 0}.cga-download-attachments{display:inline-flex;align-items:center;gap:6px;margin-right:auto;cursor:pointer}.cga-actions button{padding:7px 10px;background:#e5e7eb;color:#111827}.cga-actions .cga-export{background:#10a37f;color:#fff}.cga-actions .cga-cancel{background:#fee2e2;color:#991b1b}.cga-log-head{display:flex;align-items:center;justify-content:space-between;gap:8px}.cga-log-head strong{font-size:12px}.cga-log-actions{display:flex;gap:6px}.cga-log-actions button{padding:5px 9px;background:#e5e7eb;color:#111827}.cga-status{min-height:110px;max-height:240px;flex:0 1 auto;margin:6px 0 0;padding:10px;overflow:auto;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb;color:inherit;font:11px/1.5 ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;white-space:pre-wrap;word-break:break-word;-webkit-user-select:text;user-select:text}.cga-progress{width:100%;margin-top:9px}.cga-tone-success .cga-status{color:#15803d}.cga-tone-warning .cga-status{color:#b45309}.cga-tone-error .cga-status{color:#b91c1c}@media(prefers-color-scheme:dark){.cga-panel{border-color:#4b5563;background:#202123;color:#e5e7eb}.cga-toolbar,.cga-selection-list{border-color:#374151}.cga-source,.cga-search{border-color:#4b5563;background:#202123;color:#e5e7eb}.cga-selected-count,.cga-local-status,.cga-source-loading,.cga-version,.cga-search-help,.cga-list-message,.cga-conversation-date,.cga-list-header{color:#9ca3af}.cga-list-header .cga-sort-active,.cga-conversation-date.cga-date-active{color:#34d399}.cga-list-error{color:#f87171}.cga-conversation:hover{background:#2f3033}.cga-conversation-needs-download{background:#3a3019}.cga-conversation-needs-download:hover{background:#493a19}.cga-local-date.cga-local-needs-download{color:#fbbf24}.cga-refresh,.cga-check-updates,.cga-copy-separator,.cga-log-actions button,.cga-page-actions button{background:#374151;color:#f9fafb}.cga-status{border-color:#374151;background:#171717}.cga-actions button{background:#374151;color:#f9fafb}.cga-actions .cga-export{background:#10a37f;color:#fff}.cga-tone-success .cga-status{color:#4ade80}.cga-tone-warning .cga-status{color:#fbbf24}.cga-tone-error .cga-status{color:#f87171}} ");

(function () {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  const origin = location.origin;
  const apiBase = `${origin}/backend-api`;
  class ApiError extends Error {
    constructor(message, status, retryAfterMs = 0) {
      super(message);
      this.status = status;
      this.retryAfterMs = retryAfterMs;
      this.name = "ApiError";
    }
  }
  let sessionPromise = null;
  let accountIdPromise = null;
  function cookie(name) {
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : "";
  }
  async function session() {
    var _a, _b, _c, _d, _e, _f, _g;
    const pageSession = ((_e = (_d = (_c = (_b = (_a = _unsafeWindow == null ? void 0 : _unsafeWindow.__remixContext) == null ? void 0 : _a.state) == null ? void 0 : _b.loaderData) == null ? void 0 : _c.root) == null ? void 0 : _d.clientBootstrap) == null ? void 0 : _e.session) ?? ((_g = (_f = _unsafeWindow == null ? void 0 : _unsafeWindow.__NEXT_DATA__) == null ? void 0 : _f.props) == null ? void 0 : _g.pageProps);
    if ((pageSession == null ? void 0 : pageSession.accessToken) && (pageSession == null ? void 0 : pageSession.user)) return pageSession;
    sessionPromise ?? (sessionPromise = fetch(`${origin}/api/auth/session`, { credentials: "include" }).then(async (response) => {
      if (!response.ok) throw new ApiError(`Session request failed: ${response.status}`, response.status);
      return response.json();
    }));
    return sessionPromise;
  }
  async function activeAccountId(accessToken) {
    accountIdPromise ?? (accountIdPromise = (async () => {
      var _a, _b, _c;
      const workspace = cookie("_account");
      if (!workspace) return null;
      const response = await fetch(`${apiBase}/accounts/check/v4-2023-04-27`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Authorization": `Bearer ${accessToken}`
        }
      });
      if (!response.ok) throw new ApiError(`Account scope request failed: ${response.status}`, response.status);
      const payload = await response.json();
      return ((_c = (_b = (_a = payload == null ? void 0 : payload.accounts) == null ? void 0 : _a[workspace]) == null ? void 0 : _b.account) == null ? void 0 : _c.account_id) ?? null;
    })());
    return accountIdPromise;
  }
  async function headers(additional = {}) {
    const currentSession = await session();
    const accessToken = currentSession.accessToken;
    const accountId = await activeAccountId(accessToken);
    return {
      ...additional,
      Authorization: `Bearer ${accessToken}`,
      "X-Authorization": `Bearer ${accessToken}`,
      ...accountId ? { "Chatgpt-Account-Id": accountId } : {}
    };
  }
  function retryAfter(response) {
    const value = response.headers.get("retry-after");
    if (!value) return 0;
    const seconds = Number.parseInt(value, 10);
    return Number.isFinite(seconds) ? seconds * 1e3 : 0;
  }
  function wait(milliseconds, signal) {
    return new Promise((resolve, reject) => {
      const timer = globalThis.setTimeout(resolve, milliseconds);
      signal == null ? void 0 : signal.addEventListener("abort", () => {
        globalThis.clearTimeout(timer);
        reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
      }, { once: true });
    });
  }
  const RETRY_TIME_BUDGET_MS = 6e4;
  const CONVERSATION_REQUEST_MIN_INTERVAL_MS = 2e3;
  let nextConversationRequestAt = 0;
  async function paceConversationRequest(signal) {
    const delay = Math.max(0, nextConversationRequestAt - Date.now());
    if (delay > 0) await wait(delay, signal);
    nextConversationRequestAt = Date.now() + CONVERSATION_REQUEST_MIN_INTERVAL_MS;
  }
  async function fetchJson(path, signal, additionalHeaders = {}, pace = false) {
    let lastError;
    const startedAt = Date.now();
    for (let attempt = 1; attempt <= 5; attempt += 1) {
      signal == null ? void 0 : signal.throwIfAborted();
      try {
        if (pace) await paceConversationRequest(signal);
        const response = await fetch(path.startsWith("http") ? path : `${apiBase}${path}`, {
          credentials: "include",
          headers: await headers(additionalHeaders),
          signal
        });
        if (response.ok) return response.json();
        const error = new ApiError(
          `${response.status} ${response.statusText}: ${path}`,
          response.status,
          retryAfter(response)
        );
        lastError = error;
        if (response.status === 429) throw error;
        const retryable = response.status === 408 || response.status >= 500;
        if (!retryable || attempt === 5 || Date.now() - startedAt >= RETRY_TIME_BUDGET_MS) throw error;
        await wait(error.retryAfterMs || Math.min(1e3 * 2 ** (attempt - 1), 15e3), signal);
      } catch (error) {
        lastError = error;
        if ((signal == null ? void 0 : signal.aborted) || error instanceof ApiError || attempt === 5 || Date.now() - startedAt >= RETRY_TIME_BUDGET_MS) throw error;
        await wait(Math.min(1e3 * 2 ** (attempt - 1), 15e3), signal);
      }
    }
    throw lastError;
  }
  const fetchApiJson = fetchJson;
  async function getAccountProfile() {
    const currentSession = await session();
    const user = currentSession.user ?? {};
    return {
      id: String(user.id ?? ""),
      email: String(user.email ?? user.name ?? "unknown-account"),
      name: String(user.name ?? ""),
      accountId: await activeAccountId(currentSession.accessToken)
    };
  }
  function projectFromItem(item) {
    var _a, _b, _c;
    const project = ((_a = item == null ? void 0 : item.gizmo) == null ? void 0 : _a.gizmo) ?? (item == null ? void 0 : item.gizmo) ?? item;
    const id = project == null ? void 0 : project.id;
    if (typeof id !== "string" || !id) return null;
    return {
      id,
      name: String(((_b = project == null ? void 0 : project.display) == null ? void 0 : _b.name) ?? (project == null ? void 0 : project.name) ?? id),
      description: String(((_c = project == null ? void 0 : project.display) == null ? void 0 : _c.description) ?? (project == null ? void 0 : project.description) ?? ""),
      raw: item
    };
  }
  async function fetchProjects(signal) {
    const projects = [];
    let cursor = null;
    const seenCursors = /* @__PURE__ */ new Set();
    do {
      const params = new URLSearchParams({ conversations_per_gizmo: "0" });
      if (cursor != null) params.set("cursor", String(cursor));
      const page = await fetchJson(
        `/gizmos/snorlax/sidebar?${params}`,
        signal
      );
      for (const [index, item] of (page.items ?? []).entries()) {
        const project = projectFromItem(item);
        if (!project) throw new Error(`Project sidebar item missing ID at index ${index}`);
        projects.push(project);
      }
      cursor = page.cursor ?? null;
      if (cursor != null) {
        const key = String(cursor);
        if (seenCursors.has(key)) throw new Error(`Project pagination repeated cursor: ${key}`);
        seenCursors.add(key);
      }
    } while (cursor != null);
    return projects;
  }
  async function fetchConversationList(projectId, signal, archived = false) {
    const items = [];
    let offset = 0;
    let cursor = 0;
    const seenCursors = /* @__PURE__ */ new Set();
    while (true) {
      const page = await fetchConversationPage(projectId, signal, { archived, offset, cursor });
      items.push(...page.items);
      if (!page.hasMore) break;
      offset = page.nextOffset;
      cursor = page.nextCursor;
      if (projectId && cursor != null) {
        const key = String(cursor);
        if (seenCursors.has(key)) throw new Error(`Conversation pagination repeated cursor: ${key}`);
        seenCursors.add(key);
      }
    }
    return items;
  }
  async function fetchConversationPage(projectId, signal, options = {}) {
    const limit = options.limit ?? (projectId ? 50 : 100);
    const offset = options.offset ?? 0;
    const cursor = options.cursor ?? 0;
    if (projectId) {
      const params2 = new URLSearchParams({ limit: String(limit), cursor: String(cursor) });
      const page2 = await fetchJson(`/gizmos/${encodeURIComponent(projectId)}/conversations?${params2}`, signal);
      const items2 = page2.items ?? [];
      const nextCursor = page2.cursor ?? null;
      return {
        items: items2,
        total: null,
        nextOffset: offset + items2.length,
        nextCursor,
        hasMore: items2.length > 0 && nextCursor != null
      };
    }
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
      order: "updated",
      hide_snorlax: "true",
      ...options.archived ? { is_archived: "true" } : {}
    });
    const page = await fetchJson(`/conversations?${params}`, signal);
    const items = page.items ?? [];
    const total = page.total ?? null;
    const nextOffset = offset + items.length;
    return {
      items,
      total,
      nextOffset,
      nextCursor: null,
      hasMore: items.length > 0 && (total == null ? items.length >= limit : nextOffset < total)
    };
  }
  async function fetchAllConversationRecords(projects, signal) {
    const byId = /* @__PURE__ */ new Map();
    for (const item of await fetchConversationList(null, signal)) {
      byId.set(item.id, { item, project: null });
    }
    for (const item of await fetchConversationList(null, signal, true)) {
      byId.set(item.id, { item, project: null });
    }
    for (const project of projects) {
      for (const item of await fetchConversationList(project.id, signal)) {
        byId.set(item.id, { item, project });
      }
    }
    return [...byId.values()].sort((left, right) => {
      return toTimestamp(right.item.update_time ?? right.item.create_time) - toTimestamp(left.item.update_time ?? left.item.create_time);
    });
  }
  async function fetchArchiveCatalog(signal) {
    const projects = await fetchProjects(signal);
    return {
      projects,
      records: await fetchAllConversationRecords(projects, signal)
    };
  }
  function toTimestamp(value) {
    if (typeof value === "number") return value * 1e3;
    if (typeof value === "string") return Date.parse(value) || 0;
    return 0;
  }
  const CONVERSATION_PAGE_TURNS = 100;
  const CONVERSATION_QUERY = `include_has_versions=true&num_turns=${CONVERSATION_PAGE_TURNS}`;
  const VERSIONS_QUERY = "include_has_versions=true";
  function legacyConversationPath(id) {
    return `/conversation/${encodeURIComponent(id)}`;
  }
  function currentConversationHeadPath(id) {
    return `/conversations/${encodeURIComponent(id)}?${CONVERSATION_QUERY}`;
  }
  function currentConversationMessagesPath(id, before) {
    return `/conversations/${encodeURIComponent(id)}/messages?before=${encodeURIComponent(before)}&${CONVERSATION_QUERY}`;
  }
  function conversationVersionsPath(id, anchorId) {
    return `/conversations/${encodeURIComponent(id)}/versions?message_id=${encodeURIComponent(anchorId)}&${VERSIONS_QUERY}`;
  }
  function legacyConversationHeaders(scope) {
    var _a, _b;
    const projectId = (_a = scope == null ? void 0 : scope.projectId) == null ? void 0 : _a.trim();
    if (!projectId) return {};
    const ownerUserId = (_b = scope == null ? void 0 : scope.ownerUserId) == null ? void 0 : _b.trim();
    return {
      "Chatgpt-Project-Id": projectId,
      ...ownerUserId ? { "Chatgpt-Conv-Owner-Id": ownerUserId } : {}
    };
  }
  async function resolveFileDownload(fileId, signal, scope) {
    var _a, _b, _c;
    const encodedFileId = encodeURIComponent(fileId);
    const targetHeaders = {
      "X-OpenAI-Target-Path": `/backend-api/files/download/${encodedFileId}`,
      "X-OpenAI-Target-Route": "/backend-api/files/download/{file_id}"
    };
    const projectId = (_a = scope == null ? void 0 : scope.projectId) == null ? void 0 : _a.trim();
    if (projectId) {
      const params = new URLSearchParams({
        gizmo_id: projectId,
        download_intent: "true"
      });
      const conversationId22 = (_b = scope == null ? void 0 : scope.conversationId) == null ? void 0 : _b.trim();
      if (conversationId22) {
        params.set("check_context_scopes_for_conversation_id", conversationId22);
      }
      return fetchJson(`/files/download/${encodedFileId}?${params}`, signal, targetHeaders);
    }
    const conversationId2 = (_c = scope == null ? void 0 : scope.conversationId) == null ? void 0 : _c.trim();
    const queries = [];
    if (conversationId2) {
      queries.push(String(new URLSearchParams({ conversation_id: conversationId2, inline: "false" })));
    }
    queries.push(String(new URLSearchParams({ post_id: "", inline: "false" })));
    queries.push("download_intent=true");
    let lastError = new Error(`No file resolver accepted ${fileId}`);
    for (const query of queries) {
      try {
        return await fetchJson(
          `/files/download/${encodedFileId}?${query}`,
          signal,
          targetHeaders
        );
      } catch (error) {
        if (!(error instanceof ApiError) || error.status !== 404) throw error;
        lastError = error;
      }
    }
    throw lastError;
  }
  async function fetchFileResponse(url, signal, allowHtml = false) {
    const parsedUrl = new URL(url, origin);
    const isBackendApi = parsedUrl.origin === origin && parsedUrl.pathname.startsWith("/backend-api/");
    const response = await fetch(url, {
      credentials: "include",
      headers: isBackendApi ? await headers() : void 0,
      signal
    });
    if (!response.ok) {
      throw new ApiError(
        `${response.status} ${response.statusText}: file download`,
        response.status,
        retryAfter(response)
      );
    }
    const contentType = (response.headers.get("content-type") ?? "").toLowerCase();
    const disposition = response.headers.get("content-disposition") ?? "";
    const isInterpreterDownload = url.includes("/interpreter/download?");
    if (contentType.includes("text/html") && !allowHtml && !isInterpreterDownload && !/\battachment\b/i.test(disposition)) {
      throw new Error("File endpoint returned HTML instead of an attachment");
    }
    return response;
  }
  const version = "0.2.7";
  const EXPORTER_NAME = "chatgpt-archive";
  const EXPORTER_VERSION = version;
  const CONVERSATION_SOURCE_ROLE = "conversation_source";
  const CONVERSATION_SOURCES_ROLE = "conversation_sources";
  const ATTACHMENT_MANIFEST_ROLE = "attachment_manifest";
  function requireMessageId(message, source) {
    if (typeof (message == null ? void 0 : message.id) !== "string" || !message.id) {
      throw new Error(`Conversation message missing ID in ${source}`);
    }
    return message.id;
  }
  function assertSameMessageCore(existing, incoming, messageId) {
    var _a, _b, _c, _d;
    const scalarKeys = ["status", "end_turn", "recipient", "channel"];
    for (const key of scalarKeys) {
      const left = existing[key];
      const right = incoming[key];
      if (left !== void 0 && right !== void 0 && left !== right) {
        throw new Error(`Conversation message ${messageId} conflicts on ${String(key)}`);
      }
    }
    const leftRole = (_a = existing.author) == null ? void 0 : _a.role;
    const rightRole = (_b = incoming.author) == null ? void 0 : _b.role;
    if (leftRole !== void 0 && rightRole !== void 0 && leftRole !== rightRole) {
      throw new Error(`Conversation message ${messageId} conflicts on author.role`);
    }
    const leftName = (_c = existing.author) == null ? void 0 : _c.name;
    const rightName = (_d = incoming.author) == null ? void 0 : _d.name;
    if (leftName !== void 0 && rightName !== void 0 && leftName !== rightName) {
      throw new Error(`Conversation message ${messageId} conflicts on author.name`);
    }
    if (existing.content !== void 0 && incoming.content !== void 0 && JSON.stringify(existing.content) !== JSON.stringify(incoming.content)) {
      throw new Error(`Conversation message ${messageId} conflicts on content`);
    }
  }
  function mergeMessage(existing, incoming, messageId) {
    var _a, _b;
    assertSameMessageCore(existing, incoming, messageId);
    const merged = { ...incoming, ...existing };
    if (incoming.author || existing.author) {
      merged.author = { ...incoming.author ?? {}, ...existing.author ?? {} };
    }
    if (incoming.metadata || existing.metadata) {
      merged.metadata = { ...incoming.metadata ?? {}, ...existing.metadata ?? {} };
      if (((_a = incoming.metadata) == null ? void 0 : _a.has_versions) === true || ((_b = existing.metadata) == null ? void 0 : _b.has_versions) === true) {
        merged.metadata.has_versions = true;
      }
    }
    return merged;
  }
  function addMessages(byId, messages, source) {
    for (const message of messages) {
      const messageId = requireMessageId(message, source);
      const existing = byId.get(messageId);
      byId.set(messageId, existing ? mergeMessage(existing, message, messageId) : message);
    }
  }
  function buildConversationMapping(messages, currentBranch, versionPaths, requireSingleRoot = true) {
    var _a, _b, _c, _d;
    const choices = /* @__PURE__ */ new Map();
    const choiceFor = (messageId) => {
      let choice = choices.get(messageId);
      if (!choice) {
        choice = { raw: /* @__PURE__ */ new Set(), fallback: /* @__PURE__ */ new Set() };
        choices.set(messageId, choice);
      }
      return choice;
    };
    const addChoice = (messageId, parent, exact, fromCurrentBranch = false) => {
      const choice = choiceFor(messageId);
      if (exact && parent) choice.raw.add(parent);
      else {
        choice.fallback.add(parent);
        if (fromCurrentBranch) choice.currentFallback = parent;
      }
    };
    const currentParents = /* @__PURE__ */ new Map();
    for (let index = 0; index < currentBranch.length; index += 1) {
      const message = currentBranch[index];
      const messageId = requireMessageId(message, "current branch mapping");
      const rawParent = (_a = message.metadata) == null ? void 0 : _a.parent_id;
      let parent = null;
      let exact = false;
      if (typeof rawParent === "string" && rawParent && messages.has(rawParent)) {
        parent = rawParent;
        exact = true;
      } else if (index > 0) {
        parent = requireMessageId(currentBranch[index - 1], "current branch predecessor");
      }
      currentParents.set(messageId, parent);
      addChoice(messageId, parent, exact, true);
    }
    for (const version2 of versionPaths) {
      const startFallback = currentParents.get(version2.anchorId) ?? null;
      for (let index = 0; index < version2.messages.length; index += 1) {
        const message = version2.messages[index];
        const messageId = requireMessageId(message, `versions for ${version2.anchorId}`);
        const rawParent = (_b = message.metadata) == null ? void 0 : _b.parent_id;
        if (typeof rawParent === "string" && rawParent && messages.has(rawParent)) {
          addChoice(messageId, rawParent, true);
        } else if (index > 0) {
          addChoice(
            messageId,
            requireMessageId(version2.messages[index - 1], `versions for ${version2.anchorId} predecessor`),
            false
          );
        } else {
          addChoice(messageId, startFallback, false);
        }
      }
    }
    const mapping = {};
    let projectedParentEdges = 0;
    const reconvergentMessageIds = [];
    let originalDanglingParentRefs = 0;
    let rootNodes = 0;
    for (const [messageId, message] of messages) {
      const choice = choices.get(messageId);
      if (!choice) throw new Error(`Conversation message ${messageId} was not present in any message path`);
      if (choice.raw.size > 1) {
        throw new Error(`Conversation message ${messageId} has conflicting server parent IDs`);
      }
      let parent = choice.raw.size === 1 ? [...choice.raw][0] : null;
      if (choice.raw.size === 0) {
        const fallbackChoices = [...new Set(choice.fallback)];
        if ("currentFallback" in choice) {
          parent = choice.currentFallback ?? null;
          if (fallbackChoices.some((value) => value !== parent)) {
            reconvergentMessageIds.push(messageId);
          }
        } else {
          const fallbackParents = fallbackChoices.filter((value) => value !== null);
          if (fallbackParents.length > 1) {
            throw new Error(`Conversation message ${messageId} has conflicting projected parents`);
          }
          if (fallbackParents.length === 1) parent = fallbackParents[0];
        }
      }
      if (choice.raw.size === 1) {
        const alternateProjectedParents = [...choice.fallback].filter((value) => value !== parent);
        if (alternateProjectedParents.length > 0) reconvergentMessageIds.push(messageId);
      }
      if (parent && !messages.has(parent)) {
        throw new Error(`Conversation message ${messageId} still has an unresolved parent ${parent}`);
      }
      const rawParent = (_c = message.metadata) == null ? void 0 : _c.parent_id;
      if (typeof rawParent === "string" && rawParent && !messages.has(rawParent)) {
        originalDanglingParentRefs += 1;
      }
      if (parent === null) rootNodes += 1;
      else if (rawParent !== parent) projectedParentEdges += 1;
      mapping[messageId] = { id: messageId, parent, children: [], message };
    }
    for (const [messageId, node] of Object.entries(mapping)) {
      const parent = node.parent;
      if (!parent) continue;
      const children = mapping[parent].children ?? (mapping[parent].children = []);
      if (!children.includes(messageId)) children.push(messageId);
    }
    const messageCount = Object.keys(mapping).length;
    if (messageCount > 0 && requireSingleRoot && rootNodes !== 1) {
      throw new Error(`Conversation mapping reconstruction produced ${rootNodes} roots for ${messageCount} messages`);
    }
    if (messageCount > 0) {
      const roots = Object.values(mapping).filter((node) => node.parent == null);
      if (roots.length === 0) {
        throw new Error(`Conversation mapping reconstruction produced no roots for ${messageCount} messages`);
      }
      const seen = /* @__PURE__ */ new Set();
      const stack = roots.map((node) => node.id).filter((id) => typeof id === "string" && id.length > 0);
      while (stack.length > 0) {
        const current = stack.pop();
        if (seen.has(current)) continue;
        seen.add(current);
        for (const child of ((_d = mapping[current]) == null ? void 0 : _d.children) ?? []) stack.push(child);
      }
      if (seen.size !== messageCount) {
        throw new Error(`Conversation mapping reconstruction left ${messageCount - seen.size} messages unreachable from the root`);
      }
    }
    return {
      mapping,
      projectedParentEdges,
      reconvergentMessageIds: [...new Set(reconvergentMessageIds)],
      originalDanglingParentRefs,
      rootNodes
    };
  }
  function conversationMapping(conversation, source) {
    const mapping = conversation.mapping;
    if (!mapping || typeof mapping !== "object" || Array.isArray(mapping)) {
      throw new Error(`Conversation ${source} has no mapping object`);
    }
    return mapping;
  }
  function orderedTreeRoot(mapping, source) {
    const roots = Object.entries(mapping).filter(([, node]) => node.parent == null).map(([id]) => id);
    if (roots.length !== 1) {
      throw new Error(`Conversation ${source} mapping has ${roots.length} roots; expected exactly one`);
    }
    for (const [parentId, node] of Object.entries(mapping)) {
      const children = node.children ?? [];
      const seen = /* @__PURE__ */ new Set();
      for (const childId of children) {
        if (seen.has(childId)) {
          throw new Error(`Conversation ${source} mapping repeats child ${childId} under ${parentId}`);
        }
        seen.add(childId);
        const child = mapping[childId];
        if (!child) {
          throw new Error(`Conversation ${source} mapping child ${childId} is missing`);
        }
        if (child.parent !== parentId) {
          throw new Error(
            `Conversation ${source} mapping disagrees on ${childId}: parent=${String(child.parent)}, children owner=${parentId}`
          );
        }
      }
      if (node.parent != null) {
        const parent = mapping[node.parent];
        if (!parent || !(parent.children ?? []).includes(parentId)) {
          throw new Error(`Conversation ${source} mapping parent ${node.parent} does not list child ${parentId}`);
        }
      }
    }
    return roots[0];
  }
  function pathFromAncestor(mapping, ancestorId, descendantId) {
    var _a;
    if (!mapping[ancestorId] || !mapping[descendantId]) return null;
    const reversed = [descendantId];
    const seen = new Set(reversed);
    let cursor = descendantId;
    while (cursor !== ancestorId) {
      const parent = (_a = mapping[cursor]) == null ? void 0 : _a.parent;
      if (typeof parent !== "string" || !parent) return null;
      if (seen.has(parent)) throw new Error(`Conversation current mapping contains a parent cycle at ${parent}`);
      seen.add(parent);
      reversed.push(parent);
      cursor = parent;
    }
    return reversed.reverse();
  }
  function pathFromRoot(mapping, descendantId) {
    var _a, _b;
    if (!mapping[descendantId]) return null;
    const reversed = [descendantId];
    const seen = new Set(reversed);
    let cursor = descendantId;
    while (((_a = mapping[cursor]) == null ? void 0 : _a.parent) != null) {
      const parent = (_b = mapping[cursor]) == null ? void 0 : _b.parent;
      if (typeof parent !== "string" || !parent || !mapping[parent]) return null;
      if (seen.has(parent)) throw new Error(`Conversation current mapping contains a parent cycle at ${parent}`);
      seen.add(parent);
      reversed.push(parent);
      cursor = parent;
    }
    return reversed.reverse();
  }
  function normalizeMergeContent(value, imageMetadata = false) {
    if (Array.isArray(value)) return value.map((item) => normalizeMergeContent(item, imageMetadata));
    if (!value || typeof value !== "object") return value;
    const input = value;
    const isImagePointer = input.content_type === "image_asset_pointer";
    const output = {};
    for (const [key, child] of Object.entries(input)) {
      if (imageMetadata && key === "sanitized") continue;
      output[key] = normalizeMergeContent(child, isImagePointer && key === "metadata");
    }
    return output;
  }
  function isEmptyMergeContent(content) {
    if (!content || typeof content !== "object") return true;
    const value = content;
    const type = value.content_type;
    if (type === "text") {
      const parts = value.parts;
      return Array.isArray(parts) && parts.every((part) => typeof part === "string" && part.trim() === "");
    }
    if (type === "code") return typeof value.text === "string" && value.text.trim() === "";
    if (type === "reasoning_recap") return typeof value.content === "string" && value.content.trim() === "";
    return false;
  }
  const TRUNCATION_MARKER_RE = /\s*…*\.{0,3}\s*\[truncated\]\s*\.{0,3}…*\s*/g;
  function normalizeText(value) {
    return value.replace(/\r\n?/g, "\n");
  }
  function isElidedForm(elided, full) {
    TRUNCATION_MARKER_RE.lastIndex = 0;
    const segments = elided.split(TRUNCATION_MARKER_RE);
    if (segments.length < 2) return false;
    if (full.length <= elided.length) return false;
    if (!full.startsWith(segments[0])) return false;
    const last = segments[segments.length - 1];
    if (!full.endsWith(last)) return false;
    let cursor = segments[0].length;
    for (let index = 1; index < segments.length - 1; index += 1) {
      const segment = segments[index];
      if (!segment) continue;
      const found = full.indexOf(segment, cursor);
      if (found < 0) return false;
      cursor = found + segment.length;
    }
    return full.length - last.length >= cursor;
  }
  function fullerText(left, right) {
    const a = normalizeText(left);
    const b = normalizeText(right);
    if (a === b) return "equal";
    if (a.startsWith(b)) return "left";
    if (b.startsWith(a)) return "right";
    if (isElidedForm(b, a)) return "left";
    if (isElidedForm(a, b)) return "right";
    return null;
  }
  function fullerEndpointContent(legacy, current) {
    if (!legacy || !current || typeof legacy !== "object" || typeof current !== "object") return null;
    const left = legacy;
    const right = current;
    if (left.content_type !== right.content_type) return null;
    const chooseTextParts = (a, b) => {
      if (a.length !== b.length) return null;
      let fuller = null;
      for (let index = 0; index < a.length; index += 1) {
        if (typeof a[index] !== "string" || typeof b[index] !== "string") return null;
        const side2 = fullerText(a[index], b[index]);
        if (side2 === null) return null;
        if (side2 === "equal") continue;
        if (fuller && fuller !== side2) return null;
        fuller = side2;
      }
      return fuller ?? "equal";
    };
    let side = null;
    if (left.content_type === "text" || left.content_type === "multimodal_text") {
      const a = left.parts;
      const b = right.parts;
      if (!Array.isArray(a) || !Array.isArray(b)) return null;
      side = chooseTextParts(a, b);
    } else if (left.content_type === "code" || left.content_type === "execution_output") {
      side = chooseTextParts([left.text], [right.text]);
    } else if (left.content_type === "reasoning_recap") side = chooseTextParts([left.content], [right.content]);
    return side === "left" ? legacy : side === "right" || side === "equal" ? current : null;
  }
  function contentTypeOf(content) {
    if (!content || typeof content !== "object") return null;
    const value = content.content_type;
    return typeof value === "string" ? value : null;
  }
  function mergeMessageBodies(legacy, current, messageId, conflicts) {
    if (legacy && current) {
      let preferredContent = current.content ?? legacy.content;
      if (legacy.content !== void 0 && current.content !== void 0) {
        const same = JSON.stringify(normalizeMergeContent(legacy.content)) === JSON.stringify(normalizeMergeContent(current.content));
        if (!same) {
          const legacyEmpty = isEmptyMergeContent(legacy.content);
          const currentEmpty = isEmptyMergeContent(current.content);
          if (legacyEmpty !== currentEmpty) preferredContent = legacyEmpty ? current.content : legacy.content;
          else {
            const fuller = fullerEndpointContent(legacy.content, current.content);
            if (fuller) preferredContent = fuller;
            else {
              preferredContent = legacy.content;
              conflicts.push({
                message_id: messageId,
                reason: "non_equivalent_content",
                selected_source: "legacy",
                alternate_source: "current",
                selected_content_type: contentTypeOf(legacy.content),
                alternate_content_type: contentTypeOf(current.content),
                selected_length: JSON.stringify(legacy.content).length,
                alternate_length: JSON.stringify(current.content).length
              });
            }
          }
        }
      }
      const currentCompatible = preferredContent !== void 0 ? { ...current, content: preferredContent } : current;
      const legacyCompatible = preferredContent !== void 0 ? { ...legacy, content: preferredContent } : legacy;
      return mergeMessage(currentCompatible, legacyCompatible, messageId);
    }
    return legacy ?? current;
  }
  function compressChildrenToLegacy(mapping, legacyIds, parentId) {
    var _a;
    const result = [];
    const walk = (nodeId, seen) => {
      var _a2;
      if (seen.has(nodeId)) throw new Error(`Conversation hybrid mapping contains a cycle at ${nodeId}`);
      if (legacyIds.has(nodeId)) {
        result.push(nodeId);
        return;
      }
      const nextSeen = new Set(seen);
      nextSeen.add(nodeId);
      for (const childId of ((_a2 = mapping[nodeId]) == null ? void 0 : _a2.children) ?? []) walk(childId, nextSeen);
    };
    for (const childId of ((_a = mapping[parentId]) == null ? void 0 : _a.children) ?? []) walk(childId, /* @__PURE__ */ new Set([parentId]));
    return result;
  }
  function resolveMergedCurrentNode(conversationId2, mapping, legacyCurrentNode, currentCurrentNode) {
    if (!legacyCurrentNode) return currentCurrentNode || void 0;
    if (!currentCurrentNode) return legacyCurrentNode || void 0;
    if (legacyCurrentNode === currentCurrentNode) return legacyCurrentNode;
    if (!mapping[legacyCurrentNode] || !mapping[currentCurrentNode]) {
      throw new Error(
        `Conversation ${conversationId2} hybrid current_node is missing from the merged mapping: legacy=${legacyCurrentNode}, current=${currentCurrentNode}`
      );
    }
    if (pathFromAncestor(mapping, legacyCurrentNode, currentCurrentNode)) return currentCurrentNode;
    if (pathFromAncestor(mapping, currentCurrentNode, legacyCurrentNode)) return legacyCurrentNode;
    throw new Error(
      `Conversation ${conversationId2} hybrid current_node conflict across unrelated branches: legacy=${legacyCurrentNode}, current=${currentCurrentNode}`
    );
  }
  function buildHybridConversationMapping(legacyConversation, currentConversation) {
    var _a, _b, _c, _d, _e;
    const legacy = conversationMapping(legacyConversation, "legacy response");
    const current = conversationMapping(currentConversation, "current response");
    const legacyRoot = orderedTreeRoot(legacy, "legacy response");
    const legacyIds = new Set(Object.keys(legacy));
    const currentIds = new Set(Object.keys(current));
    const finalParents = /* @__PURE__ */ new Map([[legacyRoot, null]]);
    const finalChildren = /* @__PURE__ */ new Map();
    const inserted = /* @__PURE__ */ new Set();
    const conflicts = [];
    let expandedLegacyEdges = 0;
    let rootPrefixNodes = 0;
    let sideBranchNodes = 0;
    const childrenFor = (id) => {
      let children = finalChildren.get(id);
      if (!children) {
        children = [];
        finalChildren.set(id, children);
      }
      return children;
    };
    const connect = (parentId, childId) => {
      const existingParent = finalParents.get(childId);
      if (existingParent !== void 0 && existingParent !== parentId) {
        throw new Error(
          `Conversation hybrid topology assigns ${childId} to both ${existingParent ?? "root"} and ${parentId}`
        );
      }
      finalParents.set(childId, parentId);
      const children = childrenFor(parentId);
      if (!children.includes(childId)) children.push(childId);
    };
    const expansionPath = (parentId, childId) => {
      if (current[parentId] && current[childId]) {
        const path = pathFromAncestor(current, parentId, childId);
        if (!path) {
          throw new Error(
            `Conversation hybrid topology conflict: legacy edge ${parentId} -> ${childId} is not an ancestor path in current data`
          );
        }
        return path;
      }
      const parent = legacy[parentId];
      if (!current[parentId] && (parent == null ? void 0 : parent.parent) == null && parent.message == null && current[childId]) {
        const suffix = pathFromRoot(current, childId);
        if (!suffix) {
          throw new Error(
            `Conversation hybrid topology conflict: current data has no rooted path to legacy child ${childId}`
          );
        }
        return [parentId, ...suffix];
      }
      return [parentId, childId];
    };
    const stack = [legacyRoot];
    const visitedLegacy = /* @__PURE__ */ new Set();
    while (stack.length > 0) {
      const parentId = stack.pop();
      if (visitedLegacy.has(parentId)) {
        throw new Error(`Conversation legacy mapping contains a cycle at ${parentId}`);
      }
      visitedLegacy.add(parentId);
      const legacyChildren = ((_a = legacy[parentId]) == null ? void 0 : _a.children) ?? [];
      for (const childId of legacyChildren) {
        const path = expansionPath(parentId, childId);
        const interior = path.slice(1, -1);
        const unexpectedLegacy = interior.find((id) => legacyIds.has(id));
        if (unexpectedLegacy) {
          throw new Error(
            `Conversation hybrid topology conflict: legacy node ${unexpectedLegacy} appears inside edge ${parentId} -> ${childId}`
          );
        }
        if (interior.length > 0) {
          expandedLegacyEdges += 1;
          for (const id of interior) {
            if (!legacyIds.has(id)) inserted.add(id);
          }
          if (parentId === legacyRoot && !currentIds.has(parentId) && ((_b = legacy[parentId]) == null ? void 0 : _b.message) == null) {
            rootPrefixNodes += interior.length;
          }
        }
        for (let index = 0; index < path.length - 1; index += 1) {
          connect(path[index], path[index + 1]);
        }
      }
      for (let index = legacyChildren.length - 1; index >= 0; index -= 1) {
        stack.push(legacyChildren[index]);
      }
    }
    if (visitedLegacy.size !== legacyIds.size) {
      throw new Error(
        `Conversation legacy mapping has ${legacyIds.size - visitedLegacy.size} nodes unreachable from root ${legacyRoot}`
      );
    }
    const currentOnly = [...currentIds].filter((id) => !legacyIds.has(id));
    let unplaced = currentOnly.filter((id) => !inserted.has(id));
    const reachesLegacyMemo = /* @__PURE__ */ new Map();
    const reachesLegacy = (id, visiting = /* @__PURE__ */ new Set()) => {
      var _a2;
      if (legacyIds.has(id)) return true;
      const cached = reachesLegacyMemo.get(id);
      if (cached !== void 0) return cached;
      if (visiting.has(id)) throw new Error(`Conversation current mapping contains a cycle at ${id}`);
      const next = new Set(visiting);
      next.add(id);
      const result = (((_a2 = current[id]) == null ? void 0 : _a2.children) ?? []).some((childId) => reachesLegacy(childId, next));
      reachesLegacyMemo.set(id, result);
      return result;
    };
    const sideCandidates = new Set(unplaced.filter((id) => !reachesLegacy(id)));
    let progress = true;
    while (sideCandidates.size > 0 && progress) {
      progress = false;
      for (const id of [...sideCandidates]) {
        const parentId = (_c = current[id]) == null ? void 0 : _c.parent;
        if (!parentId || !finalParents.has(parentId)) continue;
        connect(parentId, id);
        inserted.add(id);
        sideCandidates.delete(id);
        sideBranchNodes += 1;
        progress = true;
      }
    }
    unplaced = currentOnly.filter((id) => !inserted.has(id));
    if (unplaced.length > 0) {
      throw new Error(
        `Conversation hybrid topology cannot place ${unplaced.length} current-only nodes from legacy evidence: ${unplaced.slice(0, 5).join(", ")}`
      );
    }
    const unionIds = [...legacyIds, ...currentOnly];
    const mapping = {};
    for (const id of unionIds) {
      const legacyNode = legacy[id];
      const currentNode = current[id];
      const source = legacyNode ? { ...currentNode ?? {}, ...legacyNode } : { ...currentNode };
      mapping[id] = {
        ...source,
        id,
        parent: finalParents.get(id) ?? null,
        children: [...finalChildren.get(id) ?? []],
        message: mergeMessageBodies(legacyNode == null ? void 0 : legacyNode.message, currentNode == null ? void 0 : currentNode.message, id, conflicts)
      };
    }
    const roots = Object.entries(mapping).filter(([, node]) => node.parent == null).map(([id]) => id);
    if (roots.length !== 1 || roots[0] !== legacyRoot) {
      throw new Error(`Conversation hybrid mapping has invalid roots: ${roots.join(", ") || "(none)"}`);
    }
    const seen = /* @__PURE__ */ new Set();
    const walkStack = [legacyRoot];
    while (walkStack.length > 0) {
      const id = walkStack.pop();
      if (seen.has(id)) throw new Error(`Conversation hybrid mapping contains a cycle at ${id}`);
      seen.add(id);
      for (const childId of ((_d = mapping[id]) == null ? void 0 : _d.children) ?? []) walkStack.push(childId);
    }
    if (seen.size !== unionIds.length) {
      throw new Error(`Conversation hybrid mapping left ${unionIds.length - seen.size} nodes unreachable`);
    }
    for (const id of legacyIds) {
      const expected = ((_e = legacy[id]) == null ? void 0 : _e.children) ?? [];
      const actual = compressChildrenToLegacy(mapping, legacyIds, id);
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(
          `Conversation hybrid legacy roundtrip failed at ${id}: expected [${expected.join(", ")}], got [${actual.join(", ")}]`
        );
      }
    }
    return {
      mapping,
      expandedLegacyEdges,
      insertedInternalNodes: inserted.size,
      rootPrefixNodes,
      sideBranchNodes,
      legacyRoundtripVerified: true,
      conflicts
    };
  }
  function requireConversationPageInfo(value, source) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      throw new Error(`${source} has no page_info object`);
    }
    if (typeof value.has_previous_page !== "boolean") {
      throw new Error(`${source} page_info has no has_previous_page boolean`);
    }
    return value;
  }
  function currentBranchFromSources(conversationId2, head, pages) {
    if (!Array.isArray(head.messages)) {
      throw new Error(`Conversation ${conversationId2} response has no messages array`);
    }
    let branch = [...head.messages];
    for (const page of pages) {
      if (!Array.isArray(page.messages)) {
        throw new Error(`Conversation ${conversationId2} history page has no messages array`);
      }
      branch = [...page.messages, ...branch];
    }
    return branch;
  }
  function versionPathsFromSources(conversationId2, versions) {
    const paths = [];
    for (const [key, anchor] of Object.entries(versions ?? {})) {
      const anchorId = anchor.anchor_message_id || key;
      for (const request of anchor.requests ?? []) {
        if (request.payload === void 0) continue;
        const payload = request.payload;
        if (!Array.isArray(payload) || payload.some((path) => !Array.isArray(path))) {
          throw new Error(
            `Conversation ${conversationId2} versions response for ${anchorId} is not an array of message paths`
          );
        }
        for (const path of payload) {
          paths.push({ anchorId, messages: path });
        }
      }
    }
    return paths;
  }
  function rebuildCurrentConversation(conversationId2, head, pages, versionPaths, requireSingleRoot) {
    const headConversationId = typeof head.conversation_id === "string" ? head.conversation_id : "";
    if (headConversationId && headConversationId !== conversationId2) {
      throw new Error(`Conversation response ID mismatch: expected ${conversationId2}, got ${headConversationId}`);
    }
    const currentBranch = currentBranchFromSources(conversationId2, head, pages);
    const byId = /* @__PURE__ */ new Map();
    addMessages(byId, currentBranch, "current conversation history");
    for (const path of versionPaths) {
      addMessages(byId, path.messages, `versions for ${path.anchorId}`);
    }
    const rebuilt = buildConversationMapping(byId, currentBranch, versionPaths, requireSingleRoot);
    const currentNode = head.current_node;
    if (typeof currentNode === "string" && currentNode && !rebuilt.mapping[currentNode]) {
      throw new Error(`Conversation ${conversationId2} current_node is missing from reconstructed mapping: ${currentNode}`);
    }
    return {
      conversation: {
        ...head,
        id: typeof head.id === "string" && head.id ? head.id : conversationId2,
        conversation_id: headConversationId || conversationId2,
        messages: currentBranch,
        mapping: rebuilt.mapping
      },
      currentBranchMessages: new Set(
        currentBranch.map((message) => requireMessageId(message, "current branch"))
      ).size,
      versionPaths: versionPaths.length,
      uniqueMessages: byId.size,
      projectedParentEdges: rebuilt.projectedParentEdges,
      reconvergentMessageIds: rebuilt.reconvergentMessageIds,
      originalDanglingParentRefs: rebuilt.originalDanglingParentRefs,
      rootNodes: rebuilt.rootNodes
    };
  }
  function versionAnchorCounts(versions) {
    const anchors = Object.values(versions ?? {});
    const onCurrentBranch = anchors.filter((anchor) => {
      var _a;
      return (_a = anchor.anchor_origins) == null ? void 0 : _a.includes("current_branch");
    }).length;
    return {
      total: anchors.length,
      onCurrentBranch,
      fromPaths: anchors.length - onCurrentBranch
    };
  }
  function orderedMessagePages(document2) {
    const entries = Object.entries(document2.current_messages ?? {}).filter(([, page]) => (page == null ? void 0 : page.payload) !== void 0).sort((left, right) => (left[1].page_index ?? 0) - (right[1].page_index ?? 0));
    return entries.map(([, page]) => page.payload);
  }
  function assertPagingWasFollowed(conversationId2, document2) {
    var _a, _b;
    const head = (_a = document2.current_head) == null ? void 0 : _a.payload;
    if (!head) return;
    const pages = Object.values(document2.current_messages ?? {}).filter((page) => (page == null ? void 0 : page.payload) !== void 0).sort((left, right) => (left.page_index ?? 0) - (right.page_index ?? 0));
    const sourcesComplete = ((_b = document2._archive_export) == null ? void 0 : _b.complete) !== false;
    if (!sourcesComplete) return;
    let pageInfo = requireConversationPageInfo(
      head.page_info,
      `Conversation ${conversationId2} history response`
    );
    for (const page of pages) {
      if (!pageInfo.has_previous_page) {
        throw new Error(
          `Conversation ${conversationId2} sources hold a history page that was never asked for: ${page.endpoint}`
        );
      }
      pageInfo = requireConversationPageInfo(
        page.payload.page_info,
        `Conversation ${conversationId2} history page`
      );
    }
    if (pageInfo.has_previous_page) {
      throw new Error(`Conversation ${conversationId2} sources stop before the oldest history page`);
    }
  }
  function legacyExportInfo(legacy) {
    return {
      exporter: EXPORTER_NAME,
      exporter_version: EXPORTER_VERSION,
      artifact_role: CONVERSATION_SOURCE_ROLE,
      source_schema: "legacy_mapping",
      mapping_nodes: legacy.mapping ? Object.keys(legacy.mapping).length : 0,
      reconstructed_mapping: false,
      // The server's own tree is the only branch evidence on this path.
      // /versions did not answer, so branch completeness is not established.
      branch_coverage: "server_mapping_unverified"
    };
  }
  function appendReconvergentWarnings(warnings, conversationId2, messageIds) {
    for (const messageId of messageIds) {
      warnings.push({
        code: "reconvergent_path",
        message_id: messageId,
        message: `Conversation ${conversationId2} message ${messageId} appears after multiple inferred predecessors across current paths; history keeps the current-branch parent and sources keep every path`
      });
    }
  }
  function mergeConversationSources(document2, options = {}) {
    var _a, _b, _c, _d;
    const conversationId2 = (_a = document2 == null ? void 0 : document2._archive_export) == null ? void 0 : _a.conversation_id;
    if (typeof conversationId2 !== "string" || !conversationId2) {
      throw new Error("Conversation sources document has no conversation_id");
    }
    const sourcesComplete = ((_b = document2._archive_export) == null ? void 0 : _b.complete) !== false;
    const warnings = [];
    const legacy = (_c = document2.legacy) == null ? void 0 : _c.payload;
    const head = (_d = document2.current_head) == null ? void 0 : _d.payload;
    if (!legacy && !head) {
      throw new Error(
        `Conversation ${conversationId2} sources contain neither a legacy mapping nor a current history`
      );
    }
    assertPagingWasFollowed(conversationId2, document2);
    const versionPaths = versionPathsFromSources(conversationId2, document2.current_versions);
    const mergedFrom = [];
    if (legacy) mergedFrom.push("legacy");
    if (head) {
      mergedFrom.push("current_head");
      if (orderedMessagePages(document2).length > 0) mergedFrom.push("current_messages");
      if (versionPaths.length > 0) mergedFrom.push("current_versions");
    }
    const sharedProvenance = {
      exporter: EXPORTER_NAME,
      exporter_version: EXPORTER_VERSION,
      artifact_role: CONVERSATION_SOURCE_ROLE,
      ...options.sourcesFile ? { sources_file: options.sourcesFile } : {},
      sources_complete: sourcesComplete,
      merged_from: mergedFrom
    };
    if (legacy && !head) {
      warnings.push({
        code: "current_missing",
        message: `Conversation ${conversationId2} was merged from the legacy mapping alone`
      });
      const conversation2 = {
        ...legacy,
        id: legacy.id || conversationId2,
        _archive_export: {
          ...legacyExportInfo(legacy),
          ...sharedProvenance,
          merge_warning_count: warnings.length,
          content_conflict_count: 0
        }
      };
      return { conversation: conversation2, warnings, conflicts: [] };
    }
    if (!legacy && head) {
      warnings.push({
        code: "legacy_missing",
        message: `Conversation ${conversationId2} was merged from the paginated endpoints alone`
      });
      const anchors2 = versionAnchorCounts(document2.current_versions);
      const rebuilt2 = rebuildCurrentConversation(
        conversationId2,
        head,
        orderedMessagePages(document2),
        versionPaths,
        true
      );
      appendReconvergentWarnings(warnings, conversationId2, rebuilt2.reconvergentMessageIds);
      const conversation2 = {
        ...rebuilt2.conversation,
        _archive_export: {
          ...sharedProvenance,
          source_schema: "paginated_messages",
          current_branch_messages: rebuilt2.currentBranchMessages,
          version_anchors: anchors2.total,
          version_anchors_on_current_branch: anchors2.onCurrentBranch,
          version_anchors_from_paths: anchors2.fromPaths,
          version_paths: rebuilt2.versionPaths,
          unique_messages: rebuilt2.uniqueMessages,
          reconstructed_mapping: true,
          projected_parent_edges: rebuilt2.projectedParentEdges,
          reconvergent_current_messages: rebuilt2.reconvergentMessageIds.length,
          original_dangling_parent_refs: rebuilt2.originalDanglingParentRefs,
          root_nodes: rebuilt2.rootNodes,
          merge_warning_count: warnings.length,
          content_conflict_count: 0
        }
      };
      return { conversation: conversation2, warnings, conflicts: [] };
    }
    const anchors = versionAnchorCounts(document2.current_versions);
    const rebuilt = rebuildCurrentConversation(
      conversationId2,
      head,
      orderedMessagePages(document2),
      versionPaths,
      false
    );
    appendReconvergentWarnings(warnings, conversationId2, rebuilt.reconvergentMessageIds);
    const current = rebuilt.conversation;
    const legacyConversation = { ...legacy, id: legacy.id || conversationId2 };
    const hybrid = buildHybridConversationMapping(legacyConversation, current);
    const currentNode = resolveMergedCurrentNode(
      conversationId2,
      hybrid.mapping,
      legacyConversation.current_node,
      current.current_node
    );
    for (const conflict of hybrid.conflicts) {
      warnings.push({
        code: "content_conflict",
        message_id: conflict.message_id,
        message: `Conversation ${conversationId2} message ${conflict.message_id} has different non-empty bodies on the two endpoints; the legacy body is in the history and both are in the sources`
      });
    }
    const conversation = {
      ...legacyConversation,
      ...current,
      id: current.id || legacyConversation.id || conversationId2,
      conversation_id: current.conversation_id || legacyConversation.conversation_id || conversationId2,
      current_node: currentNode,
      mapping: hybrid.mapping,
      _archive_export: {
        ...sharedProvenance,
        source_schema: "hybrid_legacy_topology_paginated_nodes",
        topology_source: "legacy_mapping",
        node_source: "paginated_messages",
        legacy_mapping_nodes: Object.keys(conversationMapping(legacyConversation, "legacy response")).length,
        current_unique_messages: rebuilt.uniqueMessages,
        hybrid_mapping_nodes: Object.keys(hybrid.mapping).length,
        expanded_legacy_edges: hybrid.expandedLegacyEdges,
        inserted_internal_nodes: hybrid.insertedInternalNodes,
        root_prefix_nodes: hybrid.rootPrefixNodes,
        side_branch_nodes: hybrid.sideBranchNodes,
        unplaced_current_nodes: 0,
        topology_conflicts: 0,
        legacy_roundtrip_verified: hybrid.legacyRoundtripVerified,
        current_branch_messages: rebuilt.currentBranchMessages,
        version_anchors: anchors.total,
        version_anchors_on_current_branch: anchors.onCurrentBranch,
        version_anchors_from_paths: anchors.fromPaths,
        version_paths: rebuilt.versionPaths,
        unique_messages: rebuilt.uniqueMessages,
        reconstructed_mapping: true,
        projected_parent_edges: rebuilt.projectedParentEdges,
        reconvergent_current_messages: rebuilt.reconvergentMessageIds.length,
        original_dangling_parent_refs: rebuilt.originalDanglingParentRefs,
        root_nodes: 1,
        branch_coverage: "legacy_order_verified_current_nodes",
        merge_warning_count: warnings.length,
        content_conflict_count: hybrid.conflicts.length,
        ...hybrid.conflicts.length > 0 ? { content_conflicts: hybrid.conflicts } : {}
      }
    };
    return { conversation, warnings, conflicts: hybrid.conflicts };
  }
  const MAX_VERSION_ANCHORS = 500;
  const MAX_MESSAGE_PAGES = 2e3;
  function pageKey(index) {
    return `page_${String(index + 1).padStart(4, "0")}`;
  }
  function describeError(error) {
    if (error instanceof ApiError) {
      return { status: error.status, message: error.message };
    }
    return {
      status: null,
      message: error instanceof Error ? error.message : String(error)
    };
  }
  class SourceCollector {
    constructor(conversationId2) {
      __publicField(this, "document");
      __publicField(this, "failures", []);
      __publicField(this, "rateLimited", false);
      this.conversationId = conversationId2;
      this.document = {
        _archive_export: {
          exporter: EXPORTER_NAME,
          exporter_version: EXPORTER_VERSION,
          artifact_role: CONVERSATION_SOURCES_ROLE,
          conversation_id: conversationId2,
          generated_at: (/* @__PURE__ */ new Date()).toISOString(),
          complete: true,
          rate_limited: false,
          errors: this.failures
        }
      };
    }
    record(source, endpoint, error) {
      const described = describeError(error);
      this.failures.push({ source, endpoint, ...described });
      this.document._archive_export.complete = false;
      if (described.status === 429) {
        this.rateLimited = true;
        this.document._archive_export.rate_limited = true;
      }
      return described;
    }
    result() {
      return {
        document: this.document,
        complete: this.document._archive_export.complete,
        rateLimited: this.rateLimited,
        failures: this.failures
      };
    }
  }
  function isAbort(error, signal) {
    if (signal == null ? void 0 : signal.aborted) return true;
    return (error == null ? void 0 : error.name) === "AbortError";
  }
  function messageHasVersions(message) {
    var _a;
    return ((_a = message.metadata) == null ? void 0 : _a.has_versions) === true;
  }
  function messagesOf(payload) {
    const messages = payload == null ? void 0 : payload.messages;
    return Array.isArray(messages) ? messages : [];
  }
  function messagesInVersionsPayload(payload) {
    if (!Array.isArray(payload)) return [];
    const messages = [];
    for (const path of payload) {
      if (!Array.isArray(path)) continue;
      for (const message of path) {
        if (message && typeof message === "object") messages.push(message);
      }
    }
    return messages;
  }
  async function collectConversationSources(id, scope, signal) {
    const collector = new SourceCollector(id);
    signal == null ? void 0 : signal.throwIfAborted();
    const legacyEndpoint = legacyConversationPath(id);
    collector.document.legacy = { endpoint: legacyEndpoint };
    try {
      collector.document.legacy.payload = await fetchApiJson(
        legacyEndpoint,
        signal,
        legacyConversationHeaders(scope),
        true
      );
    } catch (error) {
      if (isAbort(error, signal)) throw error;
      collector.document.legacy.error = collector.record("legacy", legacyEndpoint, error);
    }
    if (collector.rateLimited) return collector.result();
    const headEndpoint = currentConversationHeadPath(id);
    collector.document.current_head = { endpoint: headEndpoint };
    try {
      collector.document.current_head.payload = await fetchApiJson(
        headEndpoint,
        signal,
        {},
        true
      );
    } catch (error) {
      if (isAbort(error, signal)) throw error;
      collector.document.current_head.error = collector.record("current_head", headEndpoint, error);
      return collector.result();
    }
    const head = collector.document.current_head.payload;
    const branchMessages = [...messagesOf(head)];
    const pages = {};
    collector.document.current_messages = pages;
    let pageInfo = head.page_info;
    const seenCursors = /* @__PURE__ */ new Set();
    let pageIndex = 0;
    while ((pageInfo == null ? void 0 : pageInfo.has_previous_page) === true) {
      const cursor = pageInfo.start_cursor;
      if (typeof cursor !== "string" || !cursor) {
        collector.record(
          "current_messages",
          currentConversationMessagesPath(id, ""),
          new Error(`Conversation ${id} history page is missing start_cursor`)
        );
        break;
      }
      if (seenCursors.has(cursor)) {
        collector.record(
          "current_messages",
          currentConversationMessagesPath(id, cursor),
          new Error(`Conversation history pagination repeated cursor: ${cursor}`)
        );
        break;
      }
      if (pageIndex >= MAX_MESSAGE_PAGES) {
        collector.record(
          "current_messages",
          currentConversationMessagesPath(id, cursor),
          new Error(`Conversation ${id} exceeded ${MAX_MESSAGE_PAGES} history pages`)
        );
        break;
      }
      seenCursors.add(cursor);
      const endpoint = currentConversationMessagesPath(id, cursor);
      const page = {
        endpoint,
        page_index: pageIndex,
        before: cursor
      };
      pages[pageKey(pageIndex)] = page;
      pageIndex += 1;
      try {
        page.payload = await fetchApiJson(endpoint, signal, {}, true);
      } catch (error) {
        if (isAbort(error, signal)) throw error;
        page.error = collector.record("current_messages", endpoint, error);
        break;
      }
      branchMessages.unshift(...messagesOf(page.payload));
      pageInfo = page.payload.page_info;
      if (!pageInfo || typeof pageInfo.has_previous_page !== "boolean") {
        collector.record(
          "current_messages",
          endpoint,
          new Error(`Conversation ${id} history page page_info has no has_previous_page boolean`)
        );
        break;
      }
    }
    if (!head.page_info || typeof head.page_info.has_previous_page !== "boolean") {
      collector.record(
        "current_head",
        headEndpoint,
        new Error(`Conversation ${id} history response page_info has no has_previous_page boolean`)
      );
    }
    if (collector.rateLimited) return collector.result();
    const versions = {};
    collector.document.current_versions = versions;
    const pendingAnchors = [];
    const queueAnchor = (message, origin2) => {
      if (!messageHasVersions(message)) return;
      const messageId = message.id;
      if (typeof messageId !== "string" || !messageId) return;
      const existing = versions[messageId];
      if (existing) {
        if (!existing.anchor_origins.includes(origin2)) existing.anchor_origins.push(origin2);
        return;
      }
      versions[messageId] = {
        anchor_message_id: messageId,
        anchor_origins: [origin2],
        requests: []
      };
      pendingAnchors.push(messageId);
    };
    for (const message of branchMessages) queueAnchor(message, "current_branch");
    while (pendingAnchors.length > 0) {
      if (Object.keys(versions).length > MAX_VERSION_ANCHORS) {
        collector.record(
          "current_versions",
          conversationVersionsPath(id, pendingAnchors[0]),
          new Error(`Conversation ${id} exceeded ${MAX_VERSION_ANCHORS} version anchors`)
        );
        break;
      }
      const anchorId = pendingAnchors.shift();
      const endpoint = conversationVersionsPath(id, anchorId);
      const request = {
        endpoint,
        query: { message_id: anchorId, include_has_versions: true }
      };
      versions[anchorId].requests.push(request);
      try {
        request.payload = await fetchApiJson(endpoint, signal, {}, true);
      } catch (error) {
        if (isAbort(error, signal)) throw error;
        request.error = collector.record("current_versions", endpoint, error);
        if (collector.rateLimited) break;
        continue;
      }
      for (const message of messagesInVersionsPayload(request.payload)) {
        if (message.id === anchorId) continue;
        queueAnchor(message, `version_path:${anchorId}`);
      }
    }
    return collector.result();
  }
  const SEARCH_SEPARATOR = "";
  function timeValue(value) {
    if (typeof value === "number") return value * 1e3;
    if (typeof value === "string") return Date.parse(value) || 0;
    return 0;
  }
  function sortConversationRecords(records, field, direction) {
    const multiplier = direction === "asc" ? 1 : -1;
    return [...records].sort((left, right) => {
      if (field === "title") {
        return multiplier * left.item.title.localeCompare(right.item.title);
      }
      return multiplier * (timeValue(field === "update_time" ? left.item.update_time : left.item.create_time) - timeValue(field === "update_time" ? right.item.update_time : right.item.create_time));
    });
  }
  function matchesConversationSearch(item, query) {
    const terms = query.split(SEARCH_SEPARATOR).map((term) => term.trim().toLocaleLowerCase()).filter(Boolean);
    if (!terms.length) return true;
    const title = item.title.toLocaleLowerCase();
    const id = item.id.toLocaleLowerCase();
    return terms.some((term) => title.includes(term) || id.includes(term));
  }
  function selectConversationRecords(records, selectedIds) {
    const selected = new Set(selectedIds);
    return records.filter((record) => selected.has(record.item.id));
  }
  function nonEmptyString(value) {
    return typeof value === "string" && value.trim() ? value : null;
  }
  function ownerUserIdOf(item) {
    const direct = nonEmptyString(item.owner_user_id) ?? nonEmptyString(item.conversation_owner_id);
    if (direct) return direct;
    for (const value of [item.owner, item.shared_project_conversation_owner, item.sharedProjectConversationOwner]) {
      if (!value || typeof value !== "object" || Array.isArray(value)) continue;
      const owner = value;
      const id = nonEmptyString(owner.user_id) ?? nonEmptyString(owner.id);
      if (id) return id;
    }
    return null;
  }
  function currentPageScope(conversationId2) {
    if (typeof location === "undefined") return {};
    try {
      const url = new URL(location.href);
      const match = url.pathname.match(/^\/g\/(g-p-[^/]+)\/(?:shared\/)?c\/([A-Za-z0-9-]+)$/);
      if ((match == null ? void 0 : match[2]) !== conversationId2) return {};
      return {
        projectId: match[1],
        ownerUserId: nonEmptyString(url.searchParams.get("owner_user_id"))
      };
    } catch {
      return {};
    }
  }
  function conversationRequestScopeForRecord(record) {
    var _a;
    const page = currentPageScope(record.item.id);
    return {
      projectId: ((_a = record.project) == null ? void 0 : _a.id) ?? page.projectId ?? null,
      ownerUserId: ownerUserIdOf(record.item) ?? page.ownerUserId ?? null
    };
  }
  function fileDownloadScopeForRecord(record, conversationId2, resolvedProjectId) {
    const projectId = nonEmptyString(resolvedProjectId) ?? conversationRequestScopeForRecord(record).projectId ?? null;
    return projectId ? { projectId, conversationId: conversationId2 } : { conversationId: conversationId2 };
  }
  function fileDownloadScopeForProject(projectId) {
    return { projectId };
  }
  const FILE_ID_RE = new RegExp("(?<![A-Za-z0-9])(?:file_[A-Za-z0-9]{16,}|file-(?!service\\b)[A-Za-z0-9]{16,})", "gi");
  const LIBRARY_ID_RE = /libfile_[A-Za-z0-9]{16,}/gi;
  const POINTER_RE = /(?:sediment|file-service):\/\/(?=file[_-]|libfile_)[^\s\])}"'$]+/gi;
  const MY_FILES_RE = /file:\/\/my_files\/[^\s\])}"']+/gi;
  const SANDBOX_RE = /sandbox:\/[^\s\])}"'`]+/gi;
  const SANDBOX_TRAILING_RE = /[.,;:!?、，。；：！？]+$/;
  const DATA_IMAGE_RE = /data:image\/[A-Za-z0-9.+-]+;base64,[A-Za-z0-9+/=\s]+/gi;
  const FIRST_PARTY_URL_RE = /https:\/\/[^\s\])}"']+/gi;
  function strings(value) {
    return typeof value === "string" && value.trim() ? [value.trim()] : [];
  }
  function number(value) {
    return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : void 0;
  }
  function hintsFromObject(value, inherited) {
    const name = strings(value.name)[0] ?? strings(value.file_name)[0] ?? strings(value.filename)[0] ?? inherited.name;
    const mimeType = strings(value.mime_type)[0] ?? strings(value.mimeType)[0] ?? strings(value.mimetype)[0] ?? strings(value.media_type)[0] ?? inherited.mimeType;
    const expectedSize = number(value.size_bytes) ?? number(value.file_size_bytes) ?? number(value.file_size) ?? number(value.size) ?? inherited.expectedSize;
    return { name, mimeType, expectedSize };
  }
  function classify(path, context) {
    const lower = path.toLowerCase();
    if (lower.includes("audio_asset_pointer")) return "audio";
    if (lower.includes("video_container_asset_pointer") || lower.includes("frames_asset_pointers")) return "video";
    if (lower.includes("aggregate_result") || lower.includes("jupyter_messages")) return "cot-output";
    if (lower.includes("image_gen") || lower.includes(".dalle")) return "image-input";
    if (lower.includes("library_file_id") || lower.includes("file_search") || lower.includes("citation")) return "library-file";
    if (lower.includes(".metadata.attachments[") && context.role === "user") return "user-upload";
    if (lower.includes("asset_pointer") && context.generatedMessage) return "generated-image";
    if (lower.includes("sandbox:")) return "sandbox-file";
    return "attachment";
  }
  function hashText(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16).padStart(8, "0");
  }
  function basename$1(value) {
    const clean = value.split(/[?#]/, 1)[0];
    return clean.slice(clean.lastIndexOf("/") + 1);
  }
  const ESTUARY_PATH_RE = /^\/backend-api\/estuary\/content(?:\/|$)/i;
  function isAppHost(host) {
    var _a;
    if (host === "chatgpt.com" || host === "www.chatgpt.com" || host === "chat.openai.com") return true;
    return typeof location !== "undefined" && host === ((_a = location.hostname) == null ? void 0 : _a.toLowerCase());
  }
  function isFirstPartyFileUrl(value) {
    try {
      const url = new URL(value);
      const host = url.hostname.toLowerCase();
      return host.endsWith(".oaiusercontent.com") || host === "files.oaiusercontent.com" || isAppHost(host) && ESTUARY_PATH_RE.test(url.pathname) || host.endsWith(".openai.com") && value.includes("/files/");
    } catch {
      return false;
    }
  }
  function generatedMessage(message) {
    var _a, _b, _c;
    const metadata = message.metadata ?? {};
    const parts = Array.isArray((_a = message.content) == null ? void 0 : _a.parts) ? message.content.parts : [];
    return metadata.async_task_type === "image_gen" || metadata.image_gen != null || metadata.dalle != null || ((_b = message.author) == null ? void 0 : _b.name) === "dalle" || ((_c = message.author) == null ? void 0 : _c.name) === "image_gen" || parts.some((part) => {
      if (!part || typeof part !== "object") return false;
      const partMetadata = part.metadata;
      return !!partMetadata && typeof partMetadata === "object" && ("generation" in partMetadata || "dalle" in partMetadata);
    });
  }
  function pathLeaf(path) {
    var _a, _b;
    return ((_b = (_a = path.match(/\.([^.[\]]+)$/)) == null ? void 0 : _a[1]) == null ? void 0 : _b.toLowerCase()) ?? "";
  }
  function isIdentifierField(path) {
    const leaf = pathLeaf(path);
    return leaf === "id" || leaf.endsWith("_id") || leaf.endsWith("id") || leaf === "file_uuid";
  }
  function isStructuredFileReferencePath(path) {
    const lower = path.toLowerCase();
    const leaf = pathLeaf(path);
    return lower.includes(".metadata.attachments[") || lower.includes(".metadata.ada_visualizations[") || lower.includes(".metadata.aggregate_result.") || lower.includes(".metadata.image_gen.") || lower.includes(".metadata.dalle.") || lower.includes(".metadata.citation") || lower.includes(".metadata.content_references[") || lower.includes(".metadata.conversation_context_citation_metadata[") || lower.includes(".metadata.pca_source_filter_mask.") || leaf.includes("pointer") || leaf === "targeted_reply" || leaf === "url" || leaf.endsWith("_url");
  }
  function isMessageContentString(path) {
    return path.includes(".message.content.parts[") || path.endsWith(".message.content.text");
  }
  function isVisibleAssistantText(path, context) {
    return context.role === "assistant" && (!context.recipient || context.recipient === "all") && (context.contentType === "text" || context.contentType === "multimodal_text") && isMessageContentString(path);
  }
  function isInsideFencedCode(value, offset) {
    let fences = 0;
    let cursor = 0;
    while (cursor < offset) {
      const next = value.indexOf("```", cursor);
      if (next < 0 || next >= offset) break;
      fences += 1;
      cursor = next + 3;
    }
    return fences % 2 === 1;
  }
  function isMarkdownLinkTarget(value, offset) {
    return value.slice(Math.max(0, offset - 2), offset) === "](";
  }
  function isWholeContentReference(value, match, path, context) {
    return isMessageContentString(path) && context.authorName !== "file_search" && context.contentType !== "code" && value.trim() === match;
  }
  function allowsFreeformReference(value, match, offset, path, context) {
    if (isStructuredFileReferencePath(path)) return true;
    if (isWholeContentReference(value, match, path, context)) return true;
    return isVisibleAssistantText(path, context) && !isInsideFencedCode(value, offset) && isMarkdownLinkTarget(value, offset);
  }
  function discoverAssets(conversation) {
    var _a, _b, _c, _d;
    const assets = /* @__PURE__ */ new Map();
    const aliasToKey = /* @__PURE__ */ new Map();
    const conversationId2 = String(conversation.id ?? conversation.conversation_id ?? "");
    const getAsset = (key, fileId) => {
      const canonicalKey = aliasToKey.get(key) ?? key;
      let asset = assets.get(canonicalKey);
      if (!asset) {
        asset = {
          key: canonicalKey,
          fileId,
          aliases: [],
          directUrls: [],
          inlineDataUrl: null,
          sandboxPaths: [],
          names: [],
          mimeTypes: [],
          expectedSizes: [],
          references: [],
          referenceOnly: false,
          referenceOnlyReason: null,
          aliasSet: /* @__PURE__ */ new Set(),
          directUrlSet: /* @__PURE__ */ new Set(),
          sandboxPathSet: /* @__PURE__ */ new Set(),
          nameSet: /* @__PURE__ */ new Set(),
          mimeTypeSet: /* @__PURE__ */ new Set(),
          expectedSizeSet: /* @__PURE__ */ new Set(),
          referenceSet: /* @__PURE__ */ new Set()
        };
        assets.set(canonicalKey, asset);
      }
      return asset;
    };
    const mergeAsset = (target, source) => {
      source.aliasSet.forEach((value) => target.aliasSet.add(value));
      source.directUrlSet.forEach((value) => target.directUrlSet.add(value));
      source.sandboxPathSet.forEach((value) => target.sandboxPathSet.add(value));
      source.nameSet.forEach((value) => target.nameSet.add(value));
      source.mimeTypeSet.forEach((value) => target.mimeTypeSet.add(value));
      source.expectedSizeSet.forEach((value) => target.expectedSizeSet.add(value));
      if (!target.inlineDataUrl) target.inlineDataUrl = source.inlineDataUrl;
      source.references.forEach((reference) => {
        const refKey = `${reference.jsonPath}
${reference.rawValue}
${reference.kind}`;
        if (!target.referenceSet.has(refKey)) {
          target.referenceSet.add(refKey);
          target.references.push(reference);
        }
      });
      for (const alias of source.aliasSet) {
        aliasToKey.set(alias, target.key);
        aliasToKey.set(`file:${alias}`, target.key);
      }
      assets.delete(source.key);
    };
    const add = (identifier, rawValue, path, context, hints, forcedKind) => {
      const normalized = identifier.replace(/^(?:sediment|file-service):\/\//i, "").replace(/^file:\/\/my_files\//i, "");
      const fileIdMatch = normalized.match(new RegExp(FILE_ID_RE.source, "i"));
      const libraryMatch = normalized.match(new RegExp(LIBRARY_ID_RE.source, "i"));
      const fileId = (fileIdMatch == null ? void 0 : fileIdMatch[0]) ?? (libraryMatch == null ? void 0 : libraryMatch[0]) ?? null;
      const key = fileId ? `file:${fileId}` : identifier;
      const asset = getAsset(key, fileId);
      if (fileId) {
        aliasToKey.set(fileId, asset.key);
        aliasToKey.set(`file:${fileId}`, asset.key);
        asset.aliasSet.add(fileId);
      }
      if (hints.name) asset.nameSet.add(basename$1(hints.name));
      if (hints.mimeType) asset.mimeTypeSet.add(hints.mimeType);
      if (hints.expectedSize != null) asset.expectedSizeSet.add(hints.expectedSize);
      const reference = {
        nodeId: context.nodeId,
        messageId: context.messageId,
        messageRole: context.role,
        jsonPath: path,
        kind: forcedKind ?? classify(path, context),
        rawValue: rawValue.slice(0, 1e3)
      };
      const refKey = `${reference.jsonPath}
${reference.rawValue}
${reference.kind}`;
      if (!asset.referenceSet.has(refKey)) {
        asset.referenceSet.add(refKey);
        asset.references.push(reference);
      }
      return asset;
    };
    const registerAttachmentAliases = (attachment, path, context, hints) => {
      const ids = [attachment.id, attachment.file_id, attachment.file_uuid, attachment.library_file_id].filter((value) => typeof value === "string" && value.length > 0);
      const primary = ids.find((value) => FILE_ID_RE.test(value)) ?? ids[0];
      FILE_ID_RE.lastIndex = 0;
      if (!primary) return;
      const asset = add(primary, primary, path, context, hints);
      for (const id of ids) {
        const existingKey = aliasToKey.get(id) ?? aliasToKey.get(`file:${id}`);
        const existing = existingKey ? assets.get(existingKey) : assets.get(`file:${id}`);
        if (existing && existing !== asset) mergeAsset(asset, existing);
        asset.aliasSet.add(id);
        aliasToKey.set(id, asset.key);
        aliasToKey.set(`file:${id}`, asset.key);
      }
      const rawName = typeof attachment.name === "string" ? attachment.name : "";
      const sandboxMatch = rawName.match(/\/mnt\/data\/[^?#]+/);
      if (sandboxMatch && conversationId2 && context.messageId) {
        const sandboxPath = sandboxMatch[0];
        const params = new URLSearchParams({
          message_id: context.messageId,
          sandbox_path: sandboxPath
        });
        asset.directUrlSet.add(
          `/backend-api/conversation/${encodeURIComponent(conversationId2)}/interpreter/download?${params}`
        );
        asset.sandboxPathSet.add(`sandbox:${sandboxPath}`);
      }
    };
    const scanString = (value, path, context, hints) => {
      var _a2;
      const matches = /* @__PURE__ */ new Set();
      for (const regex of [POINTER_RE, MY_FILES_RE]) {
        regex.lastIndex = 0;
        for (const match of value.matchAll(regex)) {
          if (!allowsFreeformReference(value, match[0], match.index, path, context)) continue;
          matches.add(match[0]);
        }
      }
      if (isIdentifierField(path)) {
        const trimmed = value.trim();
        for (const regex of [FILE_ID_RE, LIBRARY_ID_RE]) {
          const exact = trimmed.match(new RegExp(`^(?:${regex.source})$`, "i"));
          if (exact) matches.add(exact[0]);
        }
      }
      for (const match of matches) add(match, value, path, context, hints);
      SANDBOX_RE.lastIndex = 0;
      for (const match of value.matchAll(SANDBOX_RE)) {
        if (!allowsFreeformReference(value, match[0], match.index, path, context)) continue;
        const sandboxPath = match[0].replace(SANDBOX_TRAILING_RE, "");
        const fileName = basename$1(sandboxPath);
        const asset = add(
          `sandbox:${context.messageId}:${sandboxPath}`,
          value,
          path,
          context,
          { ...hints, name: fileName },
          "sandbox-file"
        );
        asset.sandboxPathSet.add(sandboxPath);
        if (!fileName) {
          asset.referenceOnly = true;
          asset.referenceOnlyReason = "Sandbox path names the /mnt/data directory, not a file";
          continue;
        }
        if (conversationId2 && context.messageId) {
          const params = new URLSearchParams({
            message_id: context.messageId,
            sandbox_path: sandboxPath.replace(/^sandbox:/i, "")
          });
          asset.directUrlSet.add(
            `/backend-api/conversation/${encodeURIComponent(conversationId2)}/interpreter/download?${params}`
          );
        }
      }
      DATA_IMAGE_RE.lastIndex = 0;
      for (const match of value.matchAll(DATA_IMAGE_RE)) {
        if (!allowsFreeformReference(value, match[0], match.index, path, context)) continue;
        const dataUrl = match[0].replace(/\s/g, "");
        const asset = add(`inline:${hashText(dataUrl)}`, dataUrl, path, context, hints, "inline-image");
        asset.inlineDataUrl = dataUrl;
      }
      FIRST_PARTY_URL_RE.lastIndex = 0;
      for (const match of value.matchAll(FIRST_PARTY_URL_RE)) {
        const url = match[0];
        if (!isFirstPartyFileUrl(url)) continue;
        if (!allowsFreeformReference(value, url, match.index, path, context)) continue;
        const id = (_a2 = url.match(new RegExp(FILE_ID_RE.source, "i"))) == null ? void 0 : _a2[0];
        const asset = add(id ?? `url:${hashText(url)}`, url, path, context, hints);
        asset.directUrlSet.add(url);
      }
    };
    const walk = (value, path, context, inheritedHints) => {
      if (typeof value === "string") {
        scanString(value, path, context, inheritedHints);
        return;
      }
      if (Array.isArray(value)) {
        value.forEach((item, index) => walk(item, `${path}[${index}]`, context, inheritedHints));
        return;
      }
      if (!value || typeof value !== "object") return;
      const record = value;
      const hints = hintsFromObject(record, inheritedHints);
      if (path.endsWith(".metadata.attachments") || path.includes(".metadata.attachments[")) {
        registerAttachmentAliases(record, path, context, hints);
      }
      for (const [key, child] of Object.entries(record)) {
        walk(child, `${path}.${key}`, context, hints);
      }
    };
    for (const [nodeId, node] of Object.entries(conversation.mapping ?? {})) {
      const message = node.message;
      if (!message) continue;
      const context = {
        nodeId,
        messageId: message.id ?? nodeId,
        role: ((_a = message.author) == null ? void 0 : _a.role) ?? "",
        authorName: ((_b = message.author) == null ? void 0 : _b.name) ?? "",
        recipient: message.recipient ?? "",
        contentType: typeof ((_c = message.content) == null ? void 0 : _c.content_type) === "string" ? message.content.content_type : "",
        generatedMessage: generatedMessage(message)
      };
      walk(message, `$.mapping.${nodeId}.message`, context, {});
    }
    const named = /* @__PURE__ */ new Map();
    for (const asset of assets.values()) {
      if (!asset.fileId) continue;
      for (const name of asset.nameSet) {
        const key = name.toLowerCase();
        const list = named.get(key) ?? [];
        list.push(asset);
        named.set(key, list);
      }
    }
    for (const [key, sandboxAsset] of [...assets.entries()]) {
      if (!key.startsWith("sandbox:")) continue;
      const name = (_d = [...sandboxAsset.nameSet][0]) == null ? void 0 : _d.toLowerCase();
      const candidates = name ? named.get(name) : void 0;
      if ((candidates == null ? void 0 : candidates.length) !== 1) continue;
      const target = candidates[0];
      sandboxAsset.references.forEach((reference) => {
        const refKey = `${reference.jsonPath}
${reference.rawValue}
${reference.kind}`;
        if (!target.referenceSet.has(refKey)) {
          target.referenceSet.add(refKey);
          target.references.push(reference);
        }
      });
      sandboxAsset.directUrlSet.forEach((url) => target.directUrlSet.add(url));
      sandboxAsset.sandboxPathSet.forEach((path) => target.sandboxPathSet.add(path));
      assets.delete(key);
    }
    return [...assets.values()].map((asset) => {
      const hasIndependentBytes = asset.fileId != null || asset.directUrlSet.size > 0 || asset.sandboxPathSet.size > 0 || asset.inlineDataUrl != null;
      const referenceOnly = asset.referenceOnly || !hasIndependentBytes;
      const referenceOnlyReason = referenceOnly ? asset.referenceOnlyReason ?? "No fileId, direct URL, sandbox file, or inline data attached to this reference" : null;
      return {
        key: asset.key,
        fileId: asset.fileId,
        aliases: [...asset.aliasSet],
        directUrls: [...asset.directUrlSet],
        inlineDataUrl: asset.inlineDataUrl,
        sandboxPaths: [...asset.sandboxPathSet],
        names: [...asset.nameSet],
        mimeTypes: [...asset.mimeTypeSet],
        expectedSizes: [...asset.expectedSizeSet],
        references: asset.references,
        referenceOnly,
        referenceOnlyReason
      };
    });
  }
  function discoverProjectAssets(project) {
    return discoverAssets({
      id: `project:${project.id}`,
      title: project.name,
      mapping: {
        project: {
          id: "project",
          children: [],
          message: {
            id: `project:${project.id}`,
            author: { role: "system", name: "project" },
            content: {
              content_type: "project_context",
              raw: project.raw
            },
            metadata: {}
          }
        }
      }
    });
  }
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var truncate;
  var hasRequiredTruncate;
  function requireTruncate() {
    if (hasRequiredTruncate) return truncate;
    hasRequiredTruncate = 1;
    function isHighSurrogate(codePoint) {
      return codePoint >= 55296 && codePoint <= 56319;
    }
    function isLowSurrogate(codePoint) {
      return codePoint >= 56320 && codePoint <= 57343;
    }
    truncate = function truncate2(getLength, string, byteLength) {
      if (typeof string !== "string") {
        throw new Error("Input must be string");
      }
      var charLength = string.length;
      var curByteLength = 0;
      var codePoint;
      var segment;
      for (var i = 0; i < charLength; i += 1) {
        codePoint = string.charCodeAt(i);
        segment = string[i];
        if (isHighSurrogate(codePoint) && isLowSurrogate(string.charCodeAt(i + 1))) {
          i += 1;
          segment += string[i];
        }
        curByteLength += getLength(segment);
        if (curByteLength === byteLength) {
          return string.slice(0, i + 1);
        } else if (curByteLength > byteLength) {
          return string.slice(0, i - segment.length + 1);
        }
      }
      return string;
    };
    return truncate;
  }
  var browser$1;
  var hasRequiredBrowser$1;
  function requireBrowser$1() {
    if (hasRequiredBrowser$1) return browser$1;
    hasRequiredBrowser$1 = 1;
    function isHighSurrogate(codePoint) {
      return codePoint >= 55296 && codePoint <= 56319;
    }
    function isLowSurrogate(codePoint) {
      return codePoint >= 56320 && codePoint <= 57343;
    }
    browser$1 = function getByteLength(string) {
      if (typeof string !== "string") {
        throw new Error("Input must be string");
      }
      var charLength = string.length;
      var byteLength = 0;
      var codePoint = null;
      var prevCodePoint = null;
      for (var i = 0; i < charLength; i++) {
        codePoint = string.charCodeAt(i);
        if (isLowSurrogate(codePoint)) {
          if (prevCodePoint != null && isHighSurrogate(prevCodePoint)) {
            byteLength += 1;
          } else {
            byteLength += 3;
          }
        } else if (codePoint <= 127) {
          byteLength += 1;
        } else if (codePoint >= 128 && codePoint <= 2047) {
          byteLength += 2;
        } else if (codePoint >= 2048 && codePoint <= 65535) {
          byteLength += 3;
        }
        prevCodePoint = codePoint;
      }
      return byteLength;
    };
    return browser$1;
  }
  var browser;
  var hasRequiredBrowser;
  function requireBrowser() {
    if (hasRequiredBrowser) return browser;
    hasRequiredBrowser = 1;
    var truncate2 = requireTruncate();
    var getLength = requireBrowser$1();
    browser = truncate2.bind(null, getLength);
    return browser;
  }
  var sanitizeFilename;
  var hasRequiredSanitizeFilename;
  function requireSanitizeFilename() {
    if (hasRequiredSanitizeFilename) return sanitizeFilename;
    hasRequiredSanitizeFilename = 1;
    var truncate2 = requireBrowser();
    var illegalRe = /[\/\?<>\\:\*\|"]/g;
    var controlRe = /[\x00-\x1f\x80-\x9f]/g;
    var reservedRe = /^\.+$/;
    var windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
    var windowsTrailingRe = /[\. ]+$/;
    function sanitize2(input, replacement) {
      if (typeof input !== "string") {
        throw new Error("Input must be string");
      }
      var sanitized = input.replace(illegalRe, replacement).replace(controlRe, replacement).replace(reservedRe, replacement).replace(windowsReservedRe, replacement).replace(windowsTrailingRe, replacement);
      return truncate2(sanitized, 255);
    }
    sanitizeFilename = function(input, options) {
      var replacement = options && options.replacement || "";
      var output = sanitize2(input, replacement);
      if (replacement === "") {
        return output;
      }
      return sanitize2(output, "");
    };
    return sanitizeFilename;
  }
  var sanitizeFilenameExports = requireSanitizeFilename();
  const sanitize = /* @__PURE__ */ getDefaultExportFromCjs(sanitizeFilenameExports);
  const MIME_EXTENSIONS = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
    "image/avif": ".avif",
    "image/heic": ".heic",
    "image/heif": ".heif",
    "audio/mpeg": ".mp3",
    "audio/mp4": ".m4a",
    "audio/wav": ".wav",
    "video/mp4": ".mp4",
    "application/pdf": ".pdf",
    "application/json": ".json",
    "text/plain": ".txt",
    "text/csv": ".csv"
  };
  function safeName(value, fallback, maxLength = 160) {
    const cleaned = sanitize(value, { replacement: "_" }).replace(/[. ]+$/g, "").trim();
    return (cleaned || fallback).slice(0, maxLength);
  }
  function basename(value) {
    const clean = value.split(/[?#]/, 1)[0];
    return clean.slice(clean.lastIndexOf("/") + 1);
  }
  function splitExtension(value) {
    const dot = value.lastIndexOf(".");
    if (dot <= 0 || dot === value.length - 1) return { base: value, extension: "" };
    return { base: value.slice(0, dot), extension: value.slice(dot) };
  }
  function fallbackLabel(asset) {
    var _a, _b;
    const kind = ((_a = asset.references[0]) == null ? void 0 : _a.kind) ?? "attachment";
    const messageId = (_b = asset.references[0]) == null ? void 0 : _b.messageId;
    return messageId ? `${kind}_${messageId}` : kind;
  }
  function assetFileName(asset, resolvedName, resolvedMime) {
    const candidate = resolvedName ?? asset.names.find(Boolean) ?? fallbackLabel(asset);
    const safeCandidate = safeName(basename(candidate), fallbackLabel(asset), 180);
    const { base, extension: originalExtension } = splitExtension(safeCandidate);
    const mime = resolvedMime ?? asset.mimeTypes[0] ?? "";
    const extension = originalExtension || MIME_EXTENSIONS[mime.toLowerCase()] || "";
    const id = safeName(asset.fileId ?? asset.key.replace(/^[^:]+:/, ""), "no-id", 96);
    return `${safeName(base, fallbackLabel(asset), 140)}_[${id}]${extension}`;
  }
  function timestampLabel(value) {
    let date;
    date = /* @__PURE__ */ new Date();
    if (Number.isNaN(date.getTime())) date = /* @__PURE__ */ new Date();
    const pad = (input) => String(input).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`;
  }
  function conversationId(conversation) {
    return String(conversation.id ?? conversation.conversation_id ?? "unknown-conversation");
  }
  function conversationFolderName(conversation) {
    const id = conversationId(conversation);
    return `[Original]_[${safeName(String(conversation.title ?? "Untitled"), "Untitled")}]_[${safeName(id, "unknown-id", 80)}]`;
  }
  function projectFolderName(project) {
    const prefix = project.id.startsWith("g-p-") ? "Project" : "GPT";
    return `[${prefix}]_[${safeName(project.name, project.id)}]_[${safeName(project.id, "unknown-project", 96)}]`;
  }
  const SNIFF_BYTES = 4096;
  const BINARY_APPLICATION_TYPES = /* @__PURE__ */ new Set([
    "application/pdf",
    "application/zip",
    "application/gzip",
    "application/x-gzip",
    "application/x-tar",
    "application/x-7z-compressed",
    "application/x-rar-compressed",
    "application/vnd.rar",
    "application/epub+zip",
    "application/msword",
    "application/vnd.ms-excel",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.oasis.opendocument.text",
    "application/vnd.oasis.opendocument.spreadsheet",
    "application/vnd.oasis.opendocument.presentation",
    "application/wasm"
  ]);
  function mediaType(value) {
    return (value ?? "").split(";", 1)[0].trim().toLowerCase();
  }
  function binaryMediaType(value) {
    const type = mediaType(value);
    if (!type || type === "image/svg+xml") return null;
    if (/^(?:image|video|audio|font)\//.test(type)) return type;
    return BINARY_APPLICATION_TYPES.has(type) ? type : null;
  }
  function documentMediaType(value) {
    const type = mediaType(value);
    if (!type) return false;
    return type.startsWith("text/") || type === "image/svg+xml" || /\/(?:json|xml|javascript|ecmascript)$/.test(type) || /\+(?:json|xml)$/.test(type) || type === "application/x-ndjson";
  }
  function normalizeHead(head) {
    return head.replace(/^\uFEFF/, "").trimStart();
  }
  function looksBinary(text) {
    for (let index = 0; index < text.length; index += 1) {
      const code = text.charCodeAt(index);
      if (code === 65533) return true;
      if (code < 32 && (code < 9 || code > 13)) return true;
    }
    return false;
  }
  function structuredShape(text) {
    if (text.startsWith("<")) return "markup";
    if (text.startsWith("{") || text.startsWith("[")) return "json";
    return null;
  }
  function snippet(text, limit = 200) {
    const collapsed = text.replace(/\s+/g, " ").trim();
    return collapsed.length > limit ? `${collapsed.slice(0, limit)}…` : collapsed;
  }
  function storageErrorEnvelope(text) {
    var _a, _b, _c, _d;
    const root = text.replace(/^<\?xml[^>]*\?>\s*/i, "");
    if (!/^<Error[\s>]/i.test(root)) return null;
    const code = (_b = (_a = root.match(/<Code>([\s\S]{0,200}?)<\/Code>/i)) == null ? void 0 : _a[1]) == null ? void 0 : _b.trim();
    const message = (_d = (_c = root.match(/<Message>([\s\S]{0,400}?)<\/Message>/i)) == null ? void 0 : _c[1]) == null ? void 0 : _d.trim();
    if (!code && !message) return null;
    return `storage error response: ${[code, message].filter(Boolean).join(": ")}`;
  }
  function providerErrorEnvelope(text) {
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      return null;
    }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const payload = parsed;
    const code = typeof payload.error_code === "string" ? payload.error_code : "";
    const detail = [payload.error_message, payload.detail, payload.message].find((value) => typeof value === "string" && value);
    if (payload.status === "error" || code) {
      return `provider error response: ${[code, detail].filter(Boolean).join(": ") || "status=error"}`;
    }
    if (typeof payload.detail === "string" && Object.keys(payload).length === 1) {
      return `provider error response: ${payload.detail}`;
    }
    return null;
  }
  function describeErrorPayload(input) {
    const text = normalizeHead(input.head);
    if (!text || looksBinary(text)) return null;
    const shape = structuredShape(text);
    if (!shape) return null;
    if (documentMediaType(input.declaredMimeType)) return null;
    const envelope = shape === "markup" ? storageErrorEnvelope(text) : providerErrorEnvelope(text);
    if (envelope) return envelope;
    const declaredBinary = binaryMediaType(input.declaredMimeType) ?? (mediaType(input.declaredMimeType) ? null : binaryMediaType(input.responseContentType));
    if (!declaredBinary) return null;
    return `declared ${declaredBinary} but the body is ${shape === "json" ? "JSON" : "markup"} text: ${snippet(text)}`;
  }
  async function payloadHead(blob) {
    const buffer = await blob.slice(0, SNIFF_BYTES).arrayBuffer();
    return new TextDecoder("utf-8").decode(buffer, { stream: true });
  }
  async function directory(root, parts) {
    let current = root;
    for (const part of parts) {
      current = await current.getDirectoryHandle(part, { create: true });
    }
    return current;
  }
  async function writeBlob(folder, name, blob) {
    const handle = await folder.getFileHandle(name, { create: true });
    const writable = await handle.createWritable();
    try {
      await writable.write(blob);
    } finally {
      await writable.close();
    }
  }
  async function writeResponse(folder, name, response) {
    const handle = await folder.getFileHandle(name, { create: true });
    const writable = await handle.createWritable();
    if (response.body && typeof writable.getWriter === "function") {
      await response.body.pipeTo(writable);
    } else {
      try {
        await writable.write(await response.blob());
      } finally {
        await writable.close();
      }
    }
    return handle.getFile();
  }
  async function writeText(folder, name, content, type = "text/plain;charset=utf-8") {
    await writeBlob(folder, name, new Blob([content], { type }));
  }
  async function writeJson(folder, name, value) {
    await writeText(folder, name, JSON.stringify(value, null, 2), "application/json;charset=utf-8");
  }
  async function existingFile(folder, name) {
    try {
      const handle = await folder.getFileHandle(name, { create: false });
      return handle.getFile();
    } catch (error) {
      if (error instanceof DOMException && error.name === "NotFoundError") return null;
      if ((error == null ? void 0 : error.name) === "NotFoundError") return null;
      throw error;
    }
  }
  async function existingFileByMarkers(folder, markers) {
    var _a;
    const entries = (_a = folder.entries) == null ? void 0 : _a.call(folder);
    if (!entries) return null;
    const tokens = [...new Set(markers.filter(Boolean))].map((marker) => `[${marker}]`);
    if (!tokens.length) return null;
    const matches = [];
    for await (const [name, handle] of entries) {
      if (handle.kind !== "file" || !tokens.some((token) => name.includes(token))) continue;
      matches.push(await handle.getFile());
    }
    if (matches.length > 1) {
      throw new Error(`Multiple local files match attachment markers: ${markers.join(", ")}`);
    }
    return matches[0] ?? null;
  }
  async function sha256(blob) {
    const digest = await crypto.subtle.digest("SHA-256", await blob.arrayBuffer());
    return [...new Uint8Array(digest)].map((value) => value.toString(16).padStart(2, "0")).join("");
  }
  const MAX_ATTEMPTS = 5;
  const MAX_HASH_BYTES = 64 * 1024 * 1024;
  class InterpreterDescriptorError extends Error {
  }
  class PermanentAssetError extends InterpreterDescriptorError {
  }
  const PERMANENT_INTERPRETER_ERROR_CODES = /* @__PURE__ */ new Set(["file_not_found"]);
  function sleep(milliseconds, signal) {
    return new Promise((resolve, reject) => {
      const timer = window.setTimeout(resolve, milliseconds);
      signal.addEventListener("abort", () => {
        window.clearTimeout(timer);
        reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
      }, { once: true });
    });
  }
  function dataUrlBlob(dataUrl) {
    const match = dataUrl.match(/^data:([^;,]+);base64,([\s\S]+)$/i);
    if (!match) throw new Error("Unsupported inline data URL");
    const binary = atob(match[2].replace(/\s/g, ""));
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return new Blob([bytes], { type: match[1] });
  }
  async function resolveAsset(asset, signal, fileDownloadScope) {
    if (asset.inlineDataUrl) {
      const blob = dataUrlBlob(asset.inlineDataUrl);
      return { blob, urls: [], name: asset.names[0] ?? null, mimeType: blob.type || null, expectedSize: blob.size };
    }
    if (asset.fileId) {
      let response = null;
      try {
        response = await resolveFileDownload(asset.fileId, signal, fileDownloadScope);
      } catch (error) {
        if (signal.aborted || asset.directUrls.length === 0) throw error;
      }
      if ((response == null ? void 0 : response.status) === "success") {
        return {
          blob: null,
          // The fresh descriptor URL first: a signed URL found in the
          // conversation was minted when the message was written and may
          // have expired. It stays behind as the fallback.
          urls: [response.download_url, ...asset.directUrls],
          name: response.file_name,
          mimeType: response.mime_type,
          expectedSize: response.file_size_bytes
        };
      }
      if (response && asset.directUrls.length === 0) {
        throw new PermanentAssetError(`${response.error_code}: ${response.error_message ?? "file resolver rejected the ID"}`);
      }
    }
    if (asset.directUrls.length > 0) {
      return {
        blob: null,
        urls: asset.directUrls,
        name: asset.names[0] ?? null,
        mimeType: asset.mimeTypes[0] ?? null,
        expectedSize: asset.expectedSizes[0] ?? null
      };
    }
    throw new Error(asset.sandboxPaths.length ? `No downloadable file ID for ${asset.sandboxPaths.join(", ")}` : "No downloadable first-party file reference");
  }
  async function writeResolvedAsset(resolved, folder, name, signal) {
    if (resolved.blob) {
      await writeBlob(folder, name, resolved.blob);
      const file = await existingFile(folder, name);
      if (!file) throw new Error("Attachment disappeared after writing");
      return file;
    }
    let lastError;
    for (const url of resolved.urls) {
      try {
        let response = await fetchFileResponse(url, signal);
        const contentType = (response.headers.get("content-type") ?? "").toLowerCase();
        const isInterpreterDescriptor = url.includes("/interpreter/download?");
        if (isInterpreterDescriptor) {
          const descriptor = await response.clone().json().catch(() => null);
          if ((descriptor == null ? void 0 : descriptor.status) === "success" && descriptor.download_url) {
            response = await fetchFileResponse(descriptor.download_url, signal, true);
          } else if (contentType.includes("json")) {
            const code = (descriptor == null ? void 0 : descriptor.error_code) ?? "";
            const detail = (descriptor == null ? void 0 : descriptor.error_message) || code || "Interpreter download endpoint returned JSON without a download URL";
            throw PERMANENT_INTERPRETER_ERROR_CODES.has(code) ? new PermanentAssetError(detail) : new InterpreterDescriptorError(detail);
          }
        }
        const file = await writeResponse(folder, name, response);
        const problem = describeErrorPayload({
          declaredMimeType: resolved.mimeType,
          responseContentType: response.headers.get("content-type"),
          head: await payloadHead(file)
        });
        if (!problem) return file;
        await discardFile(folder, name);
        throw new Error(`Download did not return the attachment: ${problem}`);
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError ?? new Error("No usable download URL");
  }
  async function discardFile(folder, name) {
    try {
      await folder.removeEntry(name);
    } catch {
    }
  }
  async function manifestHash(file) {
    return file.size <= MAX_HASH_BYTES ? sha256(file) : null;
  }
  async function isCachedDownloadDescriptor(file) {
    if (!file.name.toLowerCase().endsWith(".html") || file.size > 16 * 1024) return false;
    const text = (await file.text()).trimStart();
    if (!text.startsWith("{")) return false;
    try {
      const payload = JSON.parse(text);
      return payload.status === "success" && typeof payload.download_url === "string";
    } catch {
      return false;
    }
  }
  async function isUsableExistingFile(file, expectedSize, declaredMimeType) {
    if (file.size <= 0) return false;
    if (expectedSize != null && file.size !== expectedSize) return false;
    if (await isCachedDownloadDescriptor(file)) return false;
    return !describeErrorPayload({
      declaredMimeType: declaredMimeType || file.type || null,
      head: await payloadHead(file)
    });
  }
  function baseManifest(asset) {
    return {
      key: asset.key,
      fileId: asset.fileId,
      aliases: asset.aliases,
      localFile: null,
      status: "unresolved",
      mimeType: null,
      expectedSize: asset.expectedSizes[0] ?? null,
      actualSize: null,
      sha256: null,
      attempts: 0,
      error: null,
      reason: asset.referenceOnlyReason,
      references: asset.references
    };
  }
  async function downloadAsset(asset, folder, signal, fileDownloadScope, options = {}) {
    const manifest = baseManifest(asset);
    const hintedName = assetFileName(
      asset,
      asset.names[0] ?? null,
      asset.mimeTypes[0] ?? null
    );
    const hintedExisting = await existingFile(folder, hintedName) ?? await existingFileByMarkers(folder, asset.aliases);
    const hintedSize = asset.expectedSizes[0] ?? null;
    if (hintedExisting && await isUsableExistingFile(hintedExisting, hintedSize, asset.mimeTypes[0] ?? null)) {
      manifest.localFile = hintedExisting.name;
      manifest.status = "existing";
      manifest.mimeType = hintedExisting.type || asset.mimeTypes[0] || null;
      manifest.expectedSize = hintedSize;
      manifest.actualSize = hintedExisting.size;
      manifest.sha256 = await manifestHash(hintedExisting);
      return manifest;
    }
    if (asset.referenceOnly) {
      manifest.status = "reference-only";
      return manifest;
    }
    if (options.download === false) {
      manifest.status = "skipped";
      manifest.mimeType = asset.mimeTypes[0] ?? null;
      manifest.reason = "Attachment download disabled for this export run";
      return manifest;
    }
    if (!asset.fileId && !asset.inlineDataUrl && asset.directUrls.length === 0) {
      manifest.error = asset.sandboxPaths.length ? `Unresolved sandbox path: ${asset.sandboxPaths.join(", ")}` : "No resolver supported this reference";
      return manifest;
    }
    let lastError;
    let lastErrorPermanent = false;
    let lastErrorWasInterpreterDescriptor = false;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
      signal.throwIfAborted();
      manifest.attempts = attempt;
      try {
        const resolved = await resolveAsset(asset, signal, fileDownloadScope);
        const name = assetFileName(asset, resolved.name, resolved.mimeType);
        const existing = await existingFile(folder, name);
        if (existing && await isUsableExistingFile(existing, resolved.expectedSize, resolved.mimeType)) {
          manifest.localFile = name;
          manifest.status = "existing";
          manifest.mimeType = existing.type || resolved.mimeType;
          manifest.expectedSize = resolved.expectedSize;
          manifest.actualSize = existing.size;
          manifest.sha256 = await manifestHash(existing);
          return manifest;
        }
        const file = await writeResolvedAsset(resolved, folder, name, signal);
        if (resolved.expectedSize != null && file.size !== resolved.expectedSize) {
          throw new Error(`Size mismatch: expected ${resolved.expectedSize}, received ${file.size}`);
        }
        manifest.localFile = name;
        manifest.status = "downloaded";
        manifest.mimeType = resolved.mimeType || file.type || null;
        manifest.expectedSize = resolved.expectedSize;
        manifest.actualSize = file.size;
        manifest.sha256 = await manifestHash(file);
        return manifest;
      } catch (error) {
        lastError = error;
        if (signal.aborted) throw error;
        const permanent = error instanceof PermanentAssetError || error instanceof ApiError && (error.status === 403 || error.status === 404 || error.status === 410);
        lastErrorPermanent = permanent;
        lastErrorWasInterpreterDescriptor = error instanceof InterpreterDescriptorError;
        const retryable = !permanent && (!(error instanceof ApiError) || error.status === 408 || error.status === 429 || error.status >= 500);
        if (!retryable) break;
        if (attempt < MAX_ATTEMPTS) {
          const wait2 = error instanceof ApiError && error.retryAfterMs > 0 ? error.retryAfterMs : Math.min(1e3 * 2 ** (attempt - 1), 15e3);
          await sleep(wait2, signal);
        }
      }
    }
    manifest.status = lastErrorPermanent || lastErrorWasInterpreterDescriptor ? "unavailable" : "failed";
    manifest.error = lastError instanceof Error ? lastError.message : String(lastError);
    return manifest;
  }
  async function mapConcurrent(values, limit, worker) {
    const results = new Array(values.length);
    let nextIndex = 0;
    const runners = Array.from({ length: Math.min(limit, values.length) }, async () => {
      while (nextIndex < values.length) {
        const index = nextIndex;
        nextIndex += 1;
        results[index] = await worker(values[index], index);
      }
    });
    await Promise.all(runners);
    return results;
  }
  const MANIFEST_VERSION = 3;
  const ATTACHMENT_CONCURRENCY = 2;
  function conversationIdentity(record, document2) {
    var _a, _b;
    const legacy = (_a = document2.legacy) == null ? void 0 : _a.payload;
    const head = (_b = document2.current_head) == null ? void 0 : _b.payload;
    const pick = (key) => {
      const fromLegacy = legacy == null ? void 0 : legacy[key];
      if (fromLegacy != null && fromLegacy !== "") return fromLegacy;
      const fromHead = head == null ? void 0 : head[key];
      if (fromHead != null && fromHead !== "") return fromHead;
      return void 0;
    };
    const title = pick("title");
    return {
      id: record.item.id,
      conversation_id: record.item.id,
      title: typeof title === "string" && title ? title : String(record.item.title ?? record.item.id),
      gizmo_id: pick("gizmo_id") ?? record.item.gizmo_id ?? null,
      conversation_template_id: pick("conversation_template_id") ?? null
    };
  }
  function projectIdOf(conversation) {
    const value = conversation.gizmo_id ?? conversation.conversation_template_id;
    return typeof value === "string" && value ? value : null;
  }
  function projectForConversation(conversation, listedProject, projects) {
    if (listedProject) return listedProject;
    const projectId = projectIdOf(conversation);
    if (!projectId) return null;
    return projects.find((project) => project.id === projectId) ?? {
      id: projectId,
      name: projectId,
      description: "",
      raw: { id: projectId, source: "conversation.gizmo_id" }
    };
  }
  async function conversationDirectory(accountFolder, conversation, project) {
    if (!project) return directory(accountFolder, [conversationFolderName(conversation)]);
    const projectFolder = await directory(accountFolder, [projectFolderName(project)]);
    await writeJson(projectFolder, "project.json", project.raw);
    return directory(projectFolder, [conversationFolderName(conversation)]);
  }
  function createManifest(ownerId, entries, coverageWarnings = [], downloadAttachments = true) {
    const downloaded = entries.filter((entry) => entry.status === "downloaded").length;
    const existing = entries.filter((entry) => entry.status === "existing").length;
    const skipped = entries.filter((entry) => entry.status === "skipped").length;
    const failed = entries.filter((entry) => entry.status === "failed").length;
    const unavailable = entries.filter((entry) => entry.status === "unavailable").length;
    const unresolved = entries.filter((entry) => entry.status === "unresolved").length;
    const referenceOnly = entries.filter((entry) => entry.status === "reference-only").length;
    return {
      exporter: EXPORTER_NAME,
      exporter_version: EXPORTER_VERSION,
      artifact_role: ATTACHMENT_MANIFEST_ROLE,
      version: MANIFEST_VERSION,
      generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      conversationId: ownerId,
      downloadAttachments,
      expected: entries.length,
      downloaded,
      existing,
      skipped,
      failed,
      unavailable,
      unresolved,
      referenceOnly,
      // `unavailable` is a server-side refusal (403/404/410) that the script
      // cannot recover from, so it does not stop a run from being complete.
      complete: failed === 0 && unresolved === 0 && coverageWarnings.length === 0,
      coverageWarnings,
      assets: entries
    };
  }
  function assetProgressDetail(index, total, asset, entry) {
    const name = entry.localFile ?? asset.names[0] ?? asset.fileId ?? asset.key;
    const detail = entry.error ?? entry.reason;
    return `附件 ${index}/${total} · ${entry.status}: ${name}${detail ? ` · ${detail}` : ""}`;
  }
  function attachmentProgress(asset, entry) {
    return {
      status: entry.status,
      key: entry.key,
      fileId: entry.fileId,
      name: entry.localFile ?? asset.names[0] ?? asset.fileId ?? asset.key,
      attempts: entry.attempts,
      error: entry.error,
      reason: entry.reason
    };
  }
  function currentConversationId() {
    var _a;
    return ((_a = location.pathname.match(/^\/(?:c|g\/[^/]+\/c)\/([A-Za-z0-9-]+)/)) == null ? void 0 : _a[1]) ?? null;
  }
  async function runArchive(options) {
    var _a, _b, _c;
    const { signal, onProgress } = options;
    const downloadAttachments = options.downloadAttachments ?? true;
    signal.throwIfAborted();
    onProgress == null ? void 0 : onProgress({ phase: "listing", current: 0, total: 0, title: "读取账号", detail: "" });
    const catalogPromise = options.catalog ? Promise.resolve(options.catalog) : options.mode === "current" ? fetchProjects(signal).then((projects2) => ({ projects: projects2, records: [] })) : fetchArchiveCatalog(signal);
    const [account, catalog] = await Promise.all([
      getAccountProfile(),
      catalogPromise
    ]);
    const { projects } = catalog;
    const providerFolder = await directory(options.root, ["ChatGPT"]);
    const accountFolder = await directory(providerFolder, [`[${safeName(account.email, "unknown-account")}]`]);
    await writeJson(accountFolder, "account.json", {
      ...account,
      archivedAt: (/* @__PURE__ */ new Date()).toISOString(),
      projects: projects.map((project) => ({ id: project.id, name: project.name, description: project.description }))
    });
    let records;
    if (options.mode === "current") {
      const id = options.currentConversationId ?? currentConversationId();
      if (!id) throw new Error("当前页面没有对话 ID");
      records = [{
        item: { id, title: id, create_time: 0 },
        project: null
      }];
    } else if (options.mode === "selected") {
      records = selectConversationRecords(catalog.records, options.selectedConversationIds ?? []);
      if (records.length === 0) throw new Error("请至少选择一个对话");
    } else {
      records = catalog.records;
    }
    const summary = {
      projects: 0,
      failedProjects: 0,
      incompleteProjects: 0,
      conversations: records.length,
      processedConversations: 0,
      remainingConversations: records.length,
      stoppedByRateLimit: false,
      completeConversations: 0,
      failedConversations: 0,
      sourcesWritten: 0,
      incompleteSources: 0,
      mergedConversations: 0,
      failedMerges: 0,
      mergeWarnings: 0,
      contentConflicts: 0,
      downloaded: 0,
      existing: 0,
      skippedAssets: 0,
      failedAssets: 0,
      unavailableAssets: 0,
      unresolvedAssets: 0,
      referenceOnlyAssets: 0,
      conflictConversationIds: [],
      incompleteSourceConversationIds: [],
      failedMergeConversationIds: [],
      completeConversationIds: [],
      failedConversationIds: [],
      failedProjectIds: [],
      incompleteProjectIds: [],
      errors: []
    };
    const archivedProjectIds = /* @__PURE__ */ new Set();
    const archiveProject = async (project, projectIndex, total) => {
      var _a2;
      if (archivedProjectIds.has(project.id)) return;
      archivedProjectIds.add(project.id);
      summary.projects += 1;
      signal.throwIfAborted();
      try {
        const projectFolder = await directory(accountFolder, [projectFolderName(project)]);
        await writeJson(projectFolder, "project.json", project.raw);
        const projectAssets = discoverProjectAssets(project);
        const entries = await mapConcurrent(projectAssets, ATTACHMENT_CONCURRENCY, async (asset, assetIndex) => {
          const entry = await downloadAsset(
            asset,
            projectFolder,
            signal,
            fileDownloadScopeForProject(project.id),
            { download: downloadAttachments }
          );
          onProgress == null ? void 0 : onProgress({
            phase: "attachments",
            current: projectIndex + 1,
            total,
            title: `Project: ${project.name}`,
            detail: assetProgressDetail(assetIndex + 1, projectAssets.length, asset, entry),
            conversationId: `project:${project.id}`,
            attachment: attachmentProgress(asset, entry)
          });
          return entry;
        });
        const manifest = createManifest(`project:${project.id}`, entries, [
          "Project Sources has not been independently enumerated; this manifest covers only file references present in the Project sidebar response."
        ], downloadAttachments);
        await writeJson(projectFolder, "project-attachments-manifest.json", manifest);
        summary.downloaded += manifest.downloaded;
        summary.existing += manifest.existing;
        summary.skippedAssets += manifest.skipped;
        summary.failedAssets += manifest.failed;
        summary.unavailableAssets += manifest.unavailable;
        summary.unresolvedAssets += manifest.unresolved;
        summary.referenceOnlyAssets += manifest.referenceOnly;
        if (manifest.failed > 0 || manifest.unresolved > 0) {
          summary.failedProjects += 1;
          summary.failedProjectIds.push({ id: project.id, name: project.name });
        } else if (manifest.coverageWarnings.length > 0) {
          summary.incompleteProjects += 1;
          summary.incompleteProjectIds.push({ id: project.id, name: project.name });
        }
      } catch (error) {
        if (signal.aborted) throw error;
        summary.failedProjects += 1;
        summary.failedProjectIds.push({ id: project.id, name: project.name });
        const itemError = {
          conversationId: `project:${project.id}`,
          title: project.name,
          error: error instanceof Error ? error.message : String(error)
        };
        summary.errors.push(itemError);
        (_a2 = options.onItemError) == null ? void 0 : _a2.call(options, itemError);
      }
    };
    if (options.mode === "all") {
      for (let projectIndex = 0; projectIndex < projects.length; projectIndex += 1) {
        await archiveProject(projects[projectIndex], projectIndex, projects.length);
      }
    }
    for (let index = 0; index < records.length; index += 1) {
      signal.throwIfAborted();
      const record = records[index];
      let stopAfterCurrent = false;
      let rateLimited = false;
      onProgress == null ? void 0 : onProgress({
        phase: "conversation",
        current: index + 1,
        total: records.length,
        title: record.item.title || record.item.id,
        detail: "抓取来源数据"
      });
      try {
        const requestScope = conversationRequestScopeForRecord(record);
        const sources = await collectConversationSources(record.item.id, requestScope, signal);
        rateLimited = sources.rateLimited;
        const identity = conversationIdentity(record, sources.document);
        const title = String(identity.title ?? record.item.title ?? record.item.id);
        const project = projectForConversation(identity, record.project, projects);
        const ownerId = conversationId(identity);
        const fileDownloadScope = fileDownloadScopeForRecord(
          record,
          ownerId,
          (project == null ? void 0 : project.id) ?? requestScope.projectId ?? null
        );
        if (project) await archiveProject(project, 0, 1);
        const folder = await conversationDirectory(accountFolder, identity, project);
        const stamp = timestampLabel(void 0);
        const sourcesName = `sources-${stamp}.json`;
        const historyName = `history-${stamp}.json`;
        await writeJson(folder, sourcesName, sources.document);
        summary.sourcesWritten += 1;
        onProgress == null ? void 0 : onProgress({
          phase: "sources",
          current: index + 1,
          total: records.length,
          title,
          detail: `来源已写入 ${sourcesName}` + (sources.complete ? "" : ` · 缺 ${sources.failures.length} 个响应`),
          conversationId: record.item.id
        });
        if (!sources.complete) {
          summary.incompleteSources += 1;
          summary.incompleteSourceConversationIds.push({
            id: record.item.id,
            title,
            reason: sources.failures.map((failure) => `${failure.source}: ${failure.message}`).join("; ")
          });
        }
        if (!((_a = sources.document.legacy) == null ? void 0 : _a.payload) && !((_b = sources.document.current_head) == null ? void 0 : _b.payload)) {
          throw new Error(
            `没有任何来源响应可合并，已保存 ${sourcesName}：` + sources.failures.map((failure) => `${failure.source}: ${failure.message}`).join("; ")
          );
        }
        let merged;
        try {
          merged = mergeConversationSources(sources.document, { sourcesFile: sourcesName });
        } catch (error) {
          summary.failedMerges += 1;
          summary.failedMergeConversationIds.push({
            id: record.item.id,
            title,
            error: error instanceof Error ? error.message : String(error)
          });
          throw error;
        }
        const conversation = merged.conversation;
        await writeJson(folder, historyName, conversation);
        summary.mergedConversations += 1;
        summary.mergeWarnings += merged.warnings.length;
        onProgress == null ? void 0 : onProgress({
          phase: "merge",
          current: index + 1,
          total: records.length,
          title,
          detail: `已合并 ${historyName}` + (merged.warnings.length > 0 ? ` · ${merged.warnings.length} 条合并告警` : ""),
          conversationId: record.item.id
        });
        if (merged.conflicts.length > 0) {
          summary.contentConflicts += merged.conflicts.length;
          summary.conflictConversationIds.push({
            id: record.item.id,
            title,
            count: merged.conflicts.length
          });
        }
        if (sources.rateLimited) {
          throw new Error(
            `429 限流：来源已保存到 ${sourcesName}，历史已合并，本条附件与剩余对话未继续请求`
          );
        }
        const assets = discoverAssets(conversation);
        let completedAssets = 0;
        const entries = await mapConcurrent(assets, ATTACHMENT_CONCURRENCY, async (asset) => {
          const entry = await downloadAsset(
            asset,
            folder,
            signal,
            fileDownloadScope,
            { download: downloadAttachments }
          );
          completedAssets += 1;
          onProgress == null ? void 0 : onProgress({
            phase: "attachments",
            current: index + 1,
            total: records.length,
            title: String(conversation.title ?? record.item.title ?? record.item.id),
            detail: assetProgressDetail(completedAssets, assets.length, asset, entry),
            conversationId: record.item.id,
            attachment: attachmentProgress(asset, entry)
          });
          return entry;
        });
        const manifest = createManifest(ownerId, entries, [], downloadAttachments);
        await writeJson(folder, "attachments-manifest.json", manifest);
        summary.downloaded += manifest.downloaded;
        summary.existing += manifest.existing;
        summary.skippedAssets += manifest.skipped;
        summary.failedAssets += manifest.failed;
        summary.unavailableAssets += manifest.unavailable;
        summary.unresolvedAssets += manifest.unresolved;
        summary.referenceOnlyAssets += manifest.referenceOnly;
        if (manifest.complete && sources.complete) {
          summary.completeConversations += 1;
          summary.completeConversationIds.push({
            id: record.item.id,
            title: String(conversation.title ?? record.item.title ?? record.item.id)
          });
        } else {
          summary.failedConversations += 1;
          summary.failedConversationIds.push({
            id: record.item.id,
            title: String(conversation.title ?? record.item.title ?? record.item.id)
          });
        }
      } catch (error) {
        if (signal.aborted) throw error;
        summary.failedConversations += 1;
        summary.failedConversationIds.push({
          id: record.item.id,
          title: record.item.title
        });
        const itemError = {
          conversationId: record.item.id,
          title: record.item.title,
          error: error instanceof Error ? error.message : String(error)
        };
        summary.errors.push(itemError);
        (_c = options.onItemError) == null ? void 0 : _c.call(options, itemError);
        const status = error && typeof error === "object" && "status" in error ? error.status : null;
        if (rateLimited || status === 429) {
          summary.stoppedByRateLimit = true;
          stopAfterCurrent = true;
          for (const remaining of records.slice(index + 1)) {
            summary.failedConversations += 1;
            summary.failedConversationIds.push({
              id: remaining.item.id,
              title: remaining.item.title
            });
          }
        }
      }
      summary.processedConversations = index + 1;
      summary.remainingConversations = Math.max(0, records.length - summary.processedConversations);
      await writeJson(accountFolder, "_archive-state.json", {
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        processed: index + 1,
        total: records.length,
        summary
      });
      if (stopAfterCurrent) break;
    }
    onProgress == null ? void 0 : onProgress({
      phase: "done",
      current: summary.processedConversations,
      total: records.length,
      title: summary.stoppedByRateLimit ? "已停止" : "完成",
      detail: summary.stoppedByRateLimit ? `触发 429 限流，已停止继续请求 · 已写入文件保留 · 剩余 ${summary.remainingConversations} 条未请求` : !downloadAttachments ? `对话已保存，附件下载已关闭 · 跳过 ${summary.skippedAssets}` : summary.failedConversations > 0 || summary.failedProjects > 0 || summary.failedAssets > 0 || summary.unresolvedAssets > 0 ? "存在失败或无法解析的附件" : summary.incompleteProjects > 0 ? "可下载附件均已保存，Project 来源覆盖仍待补充" : summary.referenceOnlyAssets > 0 ? `可下载附件均已保存，保留 ${summary.referenceOnlyAssets} 个仅引用文件` : "所有附件均已保存"
    });
    return summary;
  }
  function projectSourceForPathname(pathname, projects) {
    var _a;
    const segment = (_a = pathname.match(/^\/g\/([^/]+)/)) == null ? void 0 : _a[1];
    if (!segment) return null;
    const project = projects.find((candidate) => candidate.id === segment) ?? projects.find((candidate) => segment.startsWith(`${candidate.id}-`));
    return project ? `project:${project.id}` : null;
  }
  function fieldLines(value) {
    if (value === null) return ["null"];
    return String(value).replace(/\r\n?/g, "\n").split("\n");
  }
  function formatAuditLogEntry(entry) {
    const lines = [`[${entry.timestamp}] ${entry.level} ${entry.event}`];
    for (const [key, value] of Object.entries(entry.fields ?? {})) {
      if (value === void 0) continue;
      const values = fieldLines(value);
      if (values.length === 1) {
        lines.push(`  ${key}: ${values[0]}`);
        continue;
      }
      lines.push(`  ${key}: |`);
      lines.push(...values.map((line) => `    ${line}`));
    }
    return lines.join("\n");
  }
  const CURRENT_API_CUTOFF_MS = Date.parse("2026-08-28T08:43:11+08:00");
  const METADATA_PREFIX_BYTES = 64 * 1024;
  function timestampMs(value) {
    if (typeof value === "number") return Number.isFinite(value) ? value * 1e3 : 0;
    if (typeof value === "string") return Date.parse(value) || 0;
    return 0;
  }
  function conversationServerUpdateMs(item) {
    return timestampMs(item.update_time ?? item.create_time);
  }
  function decideLocalArchive(item, local) {
    const serverUpdateMs = conversationServerUpdateMs(item);
    const localUpdateMs = (local == null ? void 0 : local.conversationUpdateMs) ?? 0;
    const usableUpdateMs = Math.max(
      (local == null ? void 0 : local.historyUpdateMs) ?? 0,
      (local == null ? void 0 : local.completeSourcesUpdateMs) ?? 0
    );
    if (!(local == null ? void 0 : local.hasHistory) && !(local == null ? void 0 : local.hasCompleteSources)) {
      return { needsDownload: true, reason: "missing_local", serverUpdateMs, localUpdateMs };
    }
    if (serverUpdateMs > usableUpdateMs) {
      return { needsDownload: true, reason: "server_newer", serverUpdateMs, localUpdateMs };
    }
    if (serverUpdateMs > 0 && serverUpdateMs < CURRENT_API_CUTOFF_MS && local.historyUpdateMs >= serverUpdateMs) {
      return {
        needsDownload: false,
        reason: "legacy_before_current_api",
        serverUpdateMs,
        localUpdateMs
      };
    }
    if (local.completeSourcesUpdateMs >= serverUpdateMs) {
      return { needsDownload: false, reason: "complete_sources", serverUpdateMs, localUpdateMs };
    }
    return { needsDownload: true, reason: "needs_sources_upgrade", serverUpdateMs, localUpdateMs };
  }
  function firstString(prefix, key) {
    const match = prefix.match(new RegExp(`"${key}"\\s*:\\s*"([^"\\\\]*(?:\\\\.[^"\\\\]*)*)"`));
    if (!match) return null;
    try {
      return JSON.parse(`"${match[1]}"`);
    } catch {
      return null;
    }
  }
  function firstScalarTime(prefix, key) {
    const match = prefix.match(new RegExp(`"${key}"\\s*:\\s*("[^"]+"|-?\\d+(?:\\.\\d+)?)`));
    if (!match) return 0;
    const raw = match[1];
    if (raw.startsWith('"')) {
      try {
        return timestampMs(JSON.parse(raw));
      } catch {
        return 0;
      }
    }
    return timestampMs(Number(raw));
  }
  function firstBoolean(prefix, key) {
    const match = prefix.match(new RegExp(`"${key}"\\s*:\\s*(true|false)`));
    if (!match) return null;
    return match[1] === "true";
  }
  function candidateFromHistory(prefix) {
    const conversationId2 = firstString(prefix, "conversation_id") ?? firstString(prefix, "id");
    if (!conversationId2) return null;
    return {
      conversationId: conversationId2,
      conversationUpdateMs: firstScalarTime(prefix, "update_time") || firstScalarTime(prefix, "create_time"),
      hasHistory: true,
      // Sources completeness is intentionally learned from sources-*.json
      // itself. `_archive_export` sits after mapping in large history files and
      // is outside the small metadata prefix we read for this fast index.
      hasCompleteSources: false,
      exporterVersion: null
    };
  }
  function candidateFromSources(prefix) {
    const conversationId2 = firstString(prefix, "conversation_id");
    if (!conversationId2) return null;
    return {
      conversationId: conversationId2,
      conversationUpdateMs: firstScalarTime(prefix, "update_time") || firstScalarTime(prefix, "create_time"),
      hasCompleteSources: firstBoolean(prefix, "complete") === true,
      exporterVersion: firstString(prefix, "exporter_version")
    };
  }
  async function readMetadataPrefix(handle) {
    const file = await handle.getFile();
    return file.slice(0, METADATA_PREFIX_BYTES).text();
  }
  function mergeCandidate(index, candidate) {
    const existing = index.get(candidate.conversationId);
    const versions = new Set((existing == null ? void 0 : existing.exporterVersions) ?? []);
    if (candidate.exporterVersion) versions.add(candidate.exporterVersion);
    index.set(candidate.conversationId, {
      conversationId: candidate.conversationId,
      conversationUpdateMs: Math.max((existing == null ? void 0 : existing.conversationUpdateMs) ?? 0, candidate.conversationUpdateMs),
      historyUpdateMs: Math.max(
        (existing == null ? void 0 : existing.historyUpdateMs) ?? 0,
        candidate.hasHistory ? candidate.conversationUpdateMs : 0
      ),
      completeSourcesUpdateMs: Math.max(
        (existing == null ? void 0 : existing.completeSourcesUpdateMs) ?? 0,
        candidate.hasCompleteSources ? candidate.conversationUpdateMs : 0
      ),
      hasHistory: Boolean((existing == null ? void 0 : existing.hasHistory) || candidate.hasHistory),
      hasCompleteSources: Boolean((existing == null ? void 0 : existing.hasCompleteSources) || candidate.hasCompleteSources),
      exporterVersions: [...versions].sort()
    });
  }
  async function directoryEntries(folder) {
    var _a;
    const iterator = (_a = folder.entries) == null ? void 0 : _a.call(folder);
    if (!iterator) throw new Error("浏览器没有提供目录遍历权限");
    const entries = [];
    for await (const entry of iterator) entries.push(entry);
    return entries;
  }
  async function optionalDirectory(root, name) {
    try {
      return await root.getDirectoryHandle(name, { create: false });
    } catch (error) {
      if ((error == null ? void 0 : error.name) === "NotFoundError") return null;
      throw error;
    }
  }
  async function scanConversationDirectory(entries, index) {
    const histories = entries.filter(([name, handle]) => handle.kind === "file" && /^history-.*\.json$/i.test(name)).sort(([left], [right]) => right.localeCompare(left));
    const sources = entries.filter(([name, handle]) => handle.kind === "file" && /^sources-.*\.json$/i.test(name)).sort(([left], [right]) => right.localeCompare(left));
    if (!histories.length && !sources.length) return false;
    for (const [, handle] of histories) {
      try {
        const candidate = candidateFromHistory(await readMetadataPrefix(handle));
        if (candidate) {
          mergeCandidate(index, candidate);
          break;
        }
      } catch {
      }
    }
    for (const [, handle] of sources) {
      try {
        const candidate = candidateFromSources(await readMetadataPrefix(handle));
        if (!candidate) continue;
        mergeCandidate(index, candidate);
        if (candidate.hasCompleteSources) break;
      } catch {
      }
    }
    return true;
  }
  async function scanTree(root, index, signal) {
    const entries = await directoryEntries(root);
    if (await scanConversationDirectory(entries, index)) return;
    for (const [, handle] of entries) {
      if (handle.kind === "directory") await scanTree(handle, index);
    }
  }
  async function scanLocalArchiveIndex(picked, signal) {
    const index = /* @__PURE__ */ new Map();
    if (picked.name === "structure" || picked.name === "structure_new") {
      await scanTree(picked, index);
      return index;
    }
    const roots = (await Promise.all([
      optionalDirectory(picked, "structure"),
      optionalDirectory(picked, "structure_new")
    ])).filter((value) => value != null);
    if (!roots.length) roots.push(picked);
    for (const root of roots) await scanTree(root, index);
    return index;
  }
  const ROOT_ID = "chatgpt-archive-root";
  const ARCHIVED_SOURCE = "archived";
  const DOWNLOAD_ATTACHMENTS_KEY = "chatgpt-archive:download-attachments";
  const REMOVED_API_MODE_KEY = "chatgpt-archive:conversation-api-v2";
  function forgetConversationApiMode() {
    try {
      localStorage.removeItem(REMOVED_API_MODE_KEY);
    } catch {
    }
  }
  function storedDownloadAttachments() {
    try {
      return localStorage.getItem(DOWNLOAD_ATTACHMENTS_KEY) !== "false";
    } catch {
      return true;
    }
  }
  function rememberDownloadAttachments(value) {
    try {
      localStorage.setItem(DOWNLOAD_ATTACHMENTS_KEY, String(value));
    } catch {
    }
  }
  const DOCKED_ROOT_IDS = /* @__PURE__ */ new Set([ROOT_ID, "chatgpt-live-stream-root"]);
  function dockPoint() {
    return trailingButtonDockPoint() ?? sidebarFooterDockPoint();
  }
  function trailingButtonDockPoint() {
    const profiles = document.querySelectorAll(
      '[data-testid="accounts-profile-button"], [role="button"][aria-label*="个人资料"], [role="button"][aria-label*="profile" i]'
    );
    for (const profile of profiles) {
      const rightAction = profile.querySelector("[data-trailing-button]") ?? profile.querySelector(
        'button[aria-label="下载应用"], button[aria-label="Download app"]'
      );
      if (rightAction == null ? void 0 : rightAction.parentElement) {
        return { container: rightAction.parentElement, anchor: rightAction };
      }
    }
    return null;
  }
  function sidebarFooterDockPoint() {
    const profile = sidebarProfileButton();
    if (!profile) return null;
    let block = profile;
    for (let row = block.parentElement; row && row.id !== "app-shell-sidebar"; block = row, row = row.parentElement) {
      const style = getComputedStyle(row);
      if (!style.display.endsWith("flex") || !style.flexDirection.startsWith("row")) continue;
      const others = Array.from(row.children).filter((child) => child !== block && !DOCKED_ROOT_IDS.has(child.id));
      if (others.length === 0) continue;
      let anchor = block.nextElementSibling;
      while (anchor && DOCKED_ROOT_IDS.has(anchor.id)) anchor = anchor.nextElementSibling;
      return { container: row, anchor };
    }
    return null;
  }
  function sidebarProfileButton() {
    const buttons = document.querySelectorAll(
      '#app-shell-sidebar button[aria-label*="个人资料"], #app-shell-sidebar button[aria-label*="profile" i]'
    );
    for (const button of buttons) {
      if (button.closest("[data-app-navigation-rail], [inert]")) continue;
      if (button.getClientRects().length === 0) continue;
      return button;
    }
    return null;
  }
  function dockUi(root) {
    const point = dockPoint();
    if (!point) {
      root.dataset.docked = "false";
      return;
    }
    if (root.parentElement !== point.container || root.nextElementSibling !== point.anchor) {
      const panel = root.querySelector(".cga-panel");
      const reopen = (panel == null ? void 0 : panel.matches(":popover-open")) ?? false;
      point.container.insertBefore(root, point.anchor);
      if (reopen) panel == null ? void 0 : panel.showPopover();
    }
    root.dataset.docked = "true";
  }
  function listIds(items) {
    return items.map((item) => {
      const label = item.title ?? item.name ?? "";
      return label ? `${item.id}  ${label}` : item.id;
    }).join("\n");
  }
  function summaryText(summary) {
    const lines = [
      `对话  完整 ${summary.completeConversations} · 未完成 ${summary.failedConversations} · 已处理 ${summary.processedConversations}/${summary.conversations}`,
      // Three separate numbers on purpose: "the API never handed the data over",
      // "the merger could not build a history out of it" and "the merger built
      // one but flagged something" are different problems.
      `来源  已写入 ${summary.sourcesWritten} · 抓取不全 ${summary.incompleteSources}`,
      `合并  成功 ${summary.mergedConversations} · 失败 ${summary.failedMerges} · 告警 ${summary.mergeWarnings} · 正文分歧 ${summary.contentConflicts}`,
      `附件  下载 ${summary.downloaded} · 已存在 ${summary.existing} · 主动跳过 ${summary.skippedAssets} · 下载失败 ${summary.failedAssets} · 服务端受限 ${summary.unavailableAssets} · 无法解析 ${summary.unresolvedAssets} · 仅引用 ${summary.referenceOnlyAssets}`,
      `Project  处理 ${summary.projects} · 未完成 ${summary.failedProjects} · Sources 未抓取 ${summary.incompleteProjects}`
    ];
    if (summary.stoppedByRateLimit) {
      lines.push("", `429 限流后已停止继续请求 · 剩余 ${summary.remainingConversations} 条未请求 · 已写入文件保留`);
    }
    if (summary.completeConversationIds.length) {
      lines.push("", `已完成对话 (${summary.completeConversationIds.length})：`, listIds(summary.completeConversationIds));
    }
    if (summary.failedConversationIds.length) {
      lines.push("", `未完成对话 (${summary.failedConversationIds.length})：`, listIds(summary.failedConversationIds));
    }
    if (summary.incompleteSourceConversationIds.length) {
      lines.push(
        "",
        `来源没抓全的对话 (${summary.incompleteSourceConversationIds.length})：`,
        summary.incompleteSourceConversationIds.map((item) => `${item.id}  ${item.title}  ${item.reason}`).join("\n")
      );
    }
    if (summary.failedMergeConversationIds.length) {
      lines.push(
        "",
        `合并失败的对话 (${summary.failedMergeConversationIds.length})，来源 JSON 已保留：`,
        summary.failedMergeConversationIds.map((item) => `${item.id}  ${item.title}  ${item.error}`).join("\n")
      );
    }
    if (summary.conflictConversationIds.length) {
      lines.push(
        "",
        `两个接口正文不一致的对话 (${summary.conflictConversationIds.length})，两份原文都在 sources 里：`,
        summary.conflictConversationIds.map((item) => `${item.id}  ${item.title}  ${item.count} 条`).join("\n")
      );
    }
    if (summary.failedProjectIds.length) {
      lines.push("", `未完成 Project (${summary.failedProjectIds.length})：`, listIds(summary.failedProjectIds));
    }
    if (summary.incompleteProjectIds.length) {
      lines.push("", `Sources 未抓取的 Project (${summary.incompleteProjectIds.length})：`, listIds(summary.incompleteProjectIds));
    }
    return lines.join("\n");
  }
  function conversationDate(value, full = false) {
    if (value == null) return "—";
    const date = new Date(typeof value === "number" ? value * 1e3 : value);
    if (Number.isNaN(date.getTime())) return "—";
    if (full) return date.toLocaleString();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  function mountUi() {
    const existing = document.getElementById(ROOT_ID);
    if (existing) {
      dockUi(existing);
      return;
    }
    const root = document.createElement("div");
    root.id = ROOT_ID;
    root.dataset.docked = "false";
    root.innerHTML = `
        <button class="cga-launch" type="button" aria-label="导出" data-tooltip="导出">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 18" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M9.952 4.604H7.776q-1.92 0-2.88 1.024-.96.96-.96 2.88v.896h3.776v7.68H.032V8.188q0-2.304.896-3.968.895-1.728 2.56-2.624Q5.216.7 7.52.7h2.432zm13.12 0h-2.176q-1.92 0-2.88 1.024-.96.96-.96 2.88v.896h3.776v7.68h-7.68V8.188q0-2.304.896-3.968.895-1.728 2.56-2.624Q18.336.7 20.64.7h2.432z"/>
            </svg>
        </button>
        <div class="cga-panel" popover="manual">
            <div class="cga-head">
                <strong>ChatGPT Archive</strong>
                <button class="cga-close" type="button" aria-label="关闭">×</button>
            </div>
            <div class="cga-toolbar">
                <select class="cga-source" aria-label="对话来源">
                    <option value="all">全部对话</option>
                    <option value="archived">归档对话</option>
                </select>
                <span class="cga-source-loading" role="status" hidden><span class="cga-spinner" aria-hidden="true"></span>加载中</span>
                <input class="cga-search" type="search" placeholder="搜索标题或对话 ID" aria-label="搜索标题或对话 ID">
                <div class="cga-toolbar-meta">
                    <span class="cga-version" aria-label="脚本版本">脚本 v${EXPORTER_VERSION}</span>
                    <button class="cga-refresh" type="button">刷新</button>
                </div>
                <div class="cga-search-help">
                    多项搜索用
                    <button class="cga-copy-separator" type="button" title="复制搜索分隔符" aria-label="复制搜索分隔符"></button>
                    分隔（匹配任一项）
                </div>
            </div>
            <div class="cga-selection-toolbar">
                <label><input class="cga-select-all" type="checkbox"> 全选当前列表</label>
                <button class="cga-check-updates" type="button" title="首次使用请选择 ChatGPT 归档目录；只扫描 structure 和 structure_new，然后只拉当前来源的服务器 list 判断哪些需要下载">检查更新</button>
                <span class="cga-local-status">本地未读取</span>
                <span class="cga-selected-count">已选 0</span>
            </div>
            <div class="cga-list-header" aria-label="对话排序">
                <span aria-hidden="true"></span>
                <button class="cga-sort" type="button" data-sort="title">标题 ↕</button>
                <button class="cga-sort" type="button" data-sort="create_time">创建 ↕</button>
                <button class="cga-sort cga-sort-active" type="button" data-sort="update_time">更新 ↓</button>
                <span title="本地归档中记录的最后对话更新时间">本地</span>
            </div>
            <div class="cga-selection-list"><p class="cga-list-message">打开后加载第一页对话</p></div>
            <div class="cga-page-actions">
                <button class="cga-load-more" type="button" hidden>加载更多</button>
                <button class="cga-load-all" type="button" hidden>加载全部</button>
            </div>
            <div class="cga-actions">
                <label class="cga-download-attachments" title="关闭后仍保存附件索引，但不请求附件文件">
                    <input type="checkbox" checked> 下载附件
                </label>
                <button class="cga-export" type="button">导出所选</button>
                <button class="cga-cancel" type="button" hidden>取消</button>
            </div>
            <div class="cga-log-head">
                <strong>运行日志</strong>
                <div class="cga-log-actions">
                    <button class="cga-clear-log" type="button" disabled>清空日志</button>
                    <button class="cga-copy-log" type="button" disabled>复制日志</button>
                </div>
            </div>
            <pre class="cga-status" role="log" aria-live="polite" aria-label="运行日志">尚未开始</pre>
            <progress class="cga-progress" max="1" value="0"></progress>
        </div>
    `;
    document.body.append(root);
    dockUi(root);
    for (const eventName of ["click", "pointerdown", "keydown"]) {
      root.addEventListener(eventName, (event) => {
        event.stopPropagation();
      });
    }
    const launch = root.querySelector(".cga-launch");
    const panel = root.querySelector(".cga-panel");
    const close = root.querySelector(".cga-close");
    const source = root.querySelector(".cga-source");
    const sourceLoading = root.querySelector(".cga-source-loading");
    const search = root.querySelector(".cga-search");
    const copySeparator = root.querySelector(".cga-copy-separator");
    const selectAll = root.querySelector(".cga-select-all");
    const checkUpdates = root.querySelector(".cga-check-updates");
    const localStatus = root.querySelector(".cga-local-status");
    const selectedCount = root.querySelector(".cga-selected-count");
    const sortButtons = [...root.querySelectorAll(".cga-sort")];
    const refresh = root.querySelector(".cga-refresh");
    const selectionList = root.querySelector(".cga-selection-list");
    const loadMore = root.querySelector(".cga-load-more");
    const loadAll = root.querySelector(".cga-load-all");
    const downloadAttachments = root.querySelector(".cga-download-attachments input");
    const exportSelected = root.querySelector(".cga-export");
    const cancel = root.querySelector(".cga-cancel");
    const status = root.querySelector(".cga-status");
    const clearLog = root.querySelector(".cga-clear-log");
    const copyLog = root.querySelector(".cga-copy-log");
    const progress = root.querySelector(".cga-progress");
    let controller = null;
    let listController = null;
    let projects = [];
    let sourcesLoaded = false;
    let running = false;
    let loading = false;
    let loadingAll = false;
    let checkingUpdates = false;
    let sortField = "update_time";
    let sortDirection = "desc";
    let localArchiveRoot = null;
    let localArchiveIndex = /* @__PURE__ */ new Map();
    let localArchiveLoaded = false;
    const selectedIds = /* @__PURE__ */ new Set();
    const sourceStates = /* @__PURE__ */ new Map();
    const recordsById = /* @__PURE__ */ new Map();
    const auditEntries = [];
    let activeRunId = null;
    const renderAuditLog = () => {
      status.textContent = auditEntries.length ? auditEntries.join("\n\n") : "尚未开始";
      const empty = auditEntries.length === 0;
      clearLog.disabled = empty;
      copyLog.disabled = empty;
      status.scrollTop = status.scrollHeight;
    };
    const appendAudit = (event, fields = {}, level = "INFO") => {
      auditEntries.push(formatAuditLogEntry({
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        level,
        event,
        fields
      }));
      renderAuditLog();
    };
    const resetAudit = () => {
      auditEntries.length = 0;
      renderAuditLog();
    };
    const setStatusTone = (tone) => {
      root.classList.toggle("cga-tone-success", tone === "success");
      root.classList.toggle("cga-tone-warning", tone === "warning");
      root.classList.toggle("cga-tone-error", tone === "error");
    };
    const projectForSource = (key) => {
      if (!key.startsWith("project:")) return null;
      const id = key.slice("project:".length);
      return projects.find((project) => project.id === id) ?? null;
    };
    const emptySourceState = () => ({
      records: [],
      nextOffset: 0,
      nextCursor: 0,
      total: null,
      hasMore: false,
      loaded: false
    });
    const currentSourceState = () => sourceStates.get(source.value) ?? null;
    const updateSortButtons = () => {
      const labels = {
        title: "标题",
        create_time: "创建",
        update_time: "更新"
      };
      for (const button of sortButtons) {
        const field = button.dataset.sort;
        const active = field === sortField;
        button.classList.toggle("cga-sort-active", active);
        button.textContent = `${labels[field]} ${active ? sortDirection === "asc" ? "↑" : "↓" : "↕"}`;
        button.setAttribute("aria-pressed", String(active));
        button.disabled = running || loading;
      }
    };
    const localDate = (record, full = false) => {
      if (!(record == null ? void 0 : record.conversationUpdateMs)) return "—";
      return conversationDate(new Date(record.conversationUpdateMs).toISOString(), full);
    };
    const decisionText = (reason) => ({
      missing_local: "本地没有归档，需要下载",
      server_newer: "服务器更新时间晚于本地，需要下载",
      legacy_before_current_api: "最后更新早于 2026-08-28 08:43；保留旧版归档，不为升级格式重下",
      complete_sources: "本地已有完整 sources，不需要下载",
      needs_sources_upgrade: "8/28 之后只有旧 history，没有完整 sources，需要补抓一次"
    })[reason];
    const updateSelectionState = () => {
      const conversationChecks = [...selectionList.querySelectorAll(".cga-conversation-check")];
      const currentSelected = conversationChecks.filter((input) => selectedIds.has(input.value)).length;
      selectedCount.textContent = `已选 ${selectedIds.size} · 当前 ${currentSelected} / ${conversationChecks.length}`;
      selectAll.checked = conversationChecks.length > 0 && currentSelected === conversationChecks.length;
      selectAll.indeterminate = currentSelected > 0 && currentSelected < conversationChecks.length;
      selectAll.disabled = running || loading || conversationChecks.length === 0;
      source.disabled = running || loading;
      sourceLoading.hidden = !loading;
      search.disabled = running;
      refresh.disabled = running || loading;
      checkUpdates.disabled = running || loading || checkingUpdates;
      loadMore.disabled = running || loading;
      loadAll.disabled = running || loading;
      downloadAttachments.disabled = running;
      for (const input of conversationChecks) input.disabled = running || loading;
      exportSelected.disabled = running || selectedIds.size === 0;
      updateSortButtons();
    };
    const setRunning = (value) => {
      running = value;
      close.disabled = value;
      cancel.hidden = !value;
      updateSelectionState();
    };
    const setListMessage = (message, error = false) => {
      const paragraph = document.createElement("p");
      paragraph.className = `cga-list-message${error ? " cga-list-error" : ""}`;
      paragraph.textContent = message;
      selectionList.replaceChildren(paragraph);
    };
    const renderSource = (preserveScroll = false) => {
      const previousScrollTop = preserveScroll ? selectionList.scrollTop : 0;
      const restoreScroll = () => {
        if (preserveScroll) selectionList.scrollTop = previousScrollTop;
      };
      const state = currentSourceState();
      const records = sortConversationRecords(
        ((state == null ? void 0 : state.records) ?? []).filter((record) => matchesConversationSearch(record.item, search.value)),
        sortField,
        sortDirection
      );
      const remaining = (state == null ? void 0 : state.total) == null ? null : Math.max(state.total - state.nextOffset, 0);
      loadMore.hidden = !(state == null ? void 0 : state.hasMore);
      loadAll.hidden = !(state == null ? void 0 : state.hasMore);
      loadMore.textContent = loading && !loadingAll ? "正在加载…" : remaining == null ? "加载更多" : `加载更多 · 剩余 ${remaining}`;
      loadAll.textContent = loadingAll ? "正在加载全部…" : "加载全部";
      selectionList.replaceChildren();
      if (loading && !(state == null ? void 0 : state.records.length)) {
        setListMessage("正在加载第一页对话…");
        updateSelectionState();
        restoreScroll();
        return;
      }
      if (!records.length) {
        setListMessage(search.value.trim() ? "已加载的对话中没有匹配项" : "这个来源没有对话");
        updateSelectionState();
        restoreScroll();
        return;
      }
      for (const record of records) {
        const local = localArchiveIndex.get(record.item.id);
        const decision = localArchiveLoaded ? decideLocalArchive(record.item, local) : null;
        const row = document.createElement("label");
        row.className = "cga-conversation";
        row.classList.toggle("cga-conversation-needs-download", (decision == null ? void 0 : decision.needsDownload) === true);
        row.title = decision ? `${record.item.id}
${decisionText(decision.reason)}` : record.item.id;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "cga-conversation-check";
        checkbox.value = record.item.id;
        checkbox.checked = selectedIds.has(record.item.id);
        const title = document.createElement("span");
        title.className = "cga-conversation-title";
        title.textContent = record.item.title || "未命名对话";
        title.title = `${title.textContent}
${record.item.id}`;
        const created = document.createElement("time");
        created.className = `cga-conversation-date${sortField === "create_time" ? " cga-date-active" : ""}`;
        created.textContent = conversationDate(record.item.create_time);
        created.title = `创建：${conversationDate(record.item.create_time, true)}`;
        const updated = document.createElement("time");
        updated.className = `cga-conversation-date${sortField === "update_time" ? " cga-date-active" : ""}`;
        updated.textContent = conversationDate(record.item.update_time);
        updated.title = `更新：${conversationDate(record.item.update_time, true)}`;
        const localUpdated = document.createElement("time");
        localUpdated.className = `cga-conversation-date cga-local-date${(decision == null ? void 0 : decision.needsDownload) ? " cga-local-needs-download" : ""}`;
        localUpdated.textContent = localArchiveLoaded ? localDate(local) : "—";
        localUpdated.title = !decision ? "点击“检查更新”读取本地归档" : local ? `本地：${localDate(local, true)}
${decisionText(decision.reason)}` : decisionText(decision.reason);
        row.append(checkbox, title, created, updated, localUpdated);
        selectionList.append(row);
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) selectedIds.add(checkbox.value);
          else selectedIds.delete(checkbox.value);
          updateSelectionState();
        });
      }
      updateSelectionState();
      restoreScroll();
    };
    const loadPage = async (reset, all = false) => {
      listController == null ? void 0 : listController.abort();
      const request = new AbortController();
      listController = request;
      const sourceKey = source.value;
      const project = projectForSource(sourceKey);
      const state = reset ? emptySourceState() : sourceStates.get(sourceKey) ?? emptySourceState();
      if (reset) sourceStates.set(sourceKey, state);
      loading = true;
      loadingAll = all;
      setStatusTone("neutral");
      const mode = reset ? "first-page" : all ? "all-remaining" : "next-page";
      if (reset) renderSource();
      else {
        if (all) loadAll.textContent = "正在加载全部…";
        else loadMore.textContent = "正在加载…";
        updateSelectionState();
      }
      try {
        const byId = new Map(state.records.map((record) => [record.item.id, record]));
        const seenCursors = /* @__PURE__ */ new Set();
        if (project && state.nextCursor != null) seenCursors.add(String(state.nextCursor));
        let pages = 0;
        do {
          const page = await fetchConversationPage((project == null ? void 0 : project.id) ?? null, request.signal, {
            archived: sourceKey === ARCHIVED_SOURCE,
            offset: state.nextOffset,
            cursor: state.nextCursor
          });
          if (request.signal.aborted) return;
          for (const item of page.items) {
            const record = { item, project };
            byId.set(item.id, record);
            recordsById.set(item.id, record);
          }
          state.records = [...byId.values()];
          state.nextOffset = page.nextOffset;
          state.nextCursor = page.nextCursor;
          state.total = page.total;
          state.hasMore = page.hasMore;
          state.loaded = true;
          pages += 1;
          if (project && state.hasMore && state.nextCursor != null) {
            const cursorKey = String(state.nextCursor);
            if (seenCursors.has(cursorKey)) {
              throw new Error(`Conversation pagination repeated cursor: ${cursorKey}`);
            }
            seenCursors.add(cursorKey);
          }
        } while (all && state.hasMore);
        appendAudit("catalog.load.complete", {
          source: sourceKey,
          mode,
          pages,
          loaded: state.records.length,
          scanned: state.nextOffset,
          total: state.total,
          hasMore: state.hasMore
        });
      } catch (error) {
        if (request.signal.aborted) return;
        appendAudit("catalog.load.error", {
          source: sourceKey,
          mode: all ? "all-remaining" : reset ? "first-page" : "next-page",
          message: error instanceof Error ? error.message : String(error)
        }, "ERROR");
        setStatusTone("error");
        if (!state.records.length) {
          setListMessage(`加载失败：${error instanceof Error ? error.message : String(error)}`, true);
        }
      } finally {
        if (listController === request) {
          listController = null;
          loading = false;
          loadingAll = false;
          renderSource(!reset);
        }
      }
    };
    const renderProjectOptions = () => {
      for (const option of [...source.querySelectorAll("option[data-project]")]) option.remove();
      for (const project of projects) {
        const option = document.createElement("option");
        option.value = `project:${project.id}`;
        option.dataset.project = "true";
        option.textContent = `Project · ${project.name}`;
        source.append(option);
      }
    };
    const selectCurrentProjectSource = () => {
      const sourceKey = projectSourceForPathname(location.pathname, projects);
      if (!sourceKey || source.value === sourceKey) return false;
      if (![...source.options].some((option) => option.value === sourceKey)) return false;
      selectedIds.clear();
      search.value = "";
      source.value = sourceKey;
      appendAudit("catalog.source.current_project", { source: sourceKey });
      return true;
    };
    const initializeSources = async () => {
      if (sourcesLoaded) {
        selectCurrentProjectSource();
        const state = currentSourceState();
        if (state == null ? void 0 : state.loaded) renderSource();
        else await loadPage(true);
        return;
      }
      listController == null ? void 0 : listController.abort();
      const request = new AbortController();
      listController = request;
      loading = true;
      setStatusTone("neutral");
      setListMessage("正在加载 Project 列表…");
      appendAudit("catalog.projects.load.start");
      updateSelectionState();
      try {
        projects = await fetchProjects(request.signal);
        if (request.signal.aborted) return;
        sourcesLoaded = true;
        renderProjectOptions();
        selectCurrentProjectSource();
        appendAudit("catalog.projects.load.complete", { projects: projects.length });
      } catch (error) {
        if (request.signal.aborted) return;
        setListMessage(`加载失败：${error instanceof Error ? error.message : String(error)}`, true);
        appendAudit("catalog.projects.load.error", {
          message: error instanceof Error ? error.message : String(error)
        }, "ERROR");
        setStatusTone("error");
        return;
      } finally {
        if (listController === request) {
          listController = null;
          loading = false;
          updateSelectionState();
        }
      }
      await loadPage(true);
    };
    const checkCurrentSourceUpdates = async () => {
      if (running || loading || checkingUpdates) return;
      try {
        if (!localArchiveRoot) {
          localArchiveRoot = await window.showDirectoryPicker({
            id: "chatgpt-archive-local-index",
            mode: "read"
          });
        }
        checkingUpdates = true;
        localStatus.textContent = "正在读取本地…";
        setStatusTone("neutral");
        updateSelectionState();
        localArchiveIndex = await scanLocalArchiveIndex(localArchiveRoot);
        localArchiveLoaded = true;
        localStatus.textContent = `本地 ${localArchiveIndex.size} 条 · 正在拉服务器 list…`;
        renderSource(true);
        await loadPage(true, true);
        const state = currentSourceState();
        if (!(state == null ? void 0 : state.loaded)) throw new Error("服务器对话 list 没有加载成功");
        if (state.hasMore) throw new Error("服务器对话 list 没有拉完，暂不自动选择");
        const reasonCounts = /* @__PURE__ */ new Map();
        for (const record of state.records) selectedIds.delete(record.item.id);
        let needed = 0;
        for (const record of state.records) {
          const decision = decideLocalArchive(
            record.item,
            localArchiveIndex.get(record.item.id)
          );
          reasonCounts.set(decision.reason, (reasonCounts.get(decision.reason) ?? 0) + 1);
          if (!decision.needsDownload) continue;
          selectedIds.add(record.item.id);
          needed += 1;
        }
        localStatus.textContent = `本地 ${localArchiveIndex.size} 条 · 当前需更新 ${needed}/${state.records.length}`;
        appendAudit("catalog.local.compare.complete", {
          source: source.value,
          localConversations: localArchiveIndex.size,
          serverConversations: state.records.length,
          selectedForDownload: needed,
          missingLocal: reasonCounts.get("missing_local") ?? 0,
          serverNewer: reasonCounts.get("server_newer") ?? 0,
          needsSourcesUpgrade: reasonCounts.get("needs_sources_upgrade") ?? 0,
          legacyBeforeCurrentApi: reasonCounts.get("legacy_before_current_api") ?? 0,
          completeSources: reasonCounts.get("complete_sources") ?? 0,
          legacyCutoff: new Date(CURRENT_API_CUTOFF_MS).toISOString()
        });
        renderSource();
      } catch (error) {
        if ((error == null ? void 0 : error.name) === "AbortError") return;
        localStatus.textContent = localArchiveLoaded ? `本地 ${localArchiveIndex.size} 条 · 检查失败` : "本地读取失败";
        appendAudit("catalog.local.compare.error", {
          source: source.value,
          message: error instanceof Error ? error.message : String(error)
        }, "ERROR");
        setStatusTone("error");
      } finally {
        checkingUpdates = false;
        updateSelectionState();
      }
    };
    let lastConversationIndex = -1;
    const update = (value) => {
      const total = Math.max(value.total, 1);
      progress.max = total;
      progress.value = value.current;
      if (value.phase === "listing") return;
      if (value.phase === "attachments") {
        const attachment = value.attachment;
        if (!attachment || !["failed", "unavailable", "unresolved"].includes(attachment.status)) return;
        appendAudit("archive.attachment.issue", {
          runId: activeRunId,
          conversationId: value.conversationId,
          title: value.title,
          status: attachment.status,
          name: attachment.name,
          fileId: attachment.fileId,
          attempts: attachment.attempts,
          message: attachment.error ?? attachment.reason ?? "附件未提供错误详情"
        }, attachment.status === "unavailable" ? "WARN" : "ERROR");
        return;
      }
      if (value.phase === "sources") {
        appendAudit("archive.sources.saved", {
          runId: activeRunId,
          conversationId: value.conversationId,
          title: value.title,
          detail: value.detail
        });
        return;
      }
      if (value.phase === "merge") {
        appendAudit("archive.history.merged", {
          runId: activeRunId,
          conversationId: value.conversationId,
          title: value.title,
          detail: value.detail
        });
        return;
      }
      if (value.phase === "conversation") {
        if (value.current === lastConversationIndex) return;
        lastConversationIndex = value.current;
        appendAudit("archive.conversation.start", {
          runId: activeRunId,
          current: value.current,
          total: value.total,
          title: value.title
        });
      }
    };
    const start = async () => {
      if (selectedIds.size === 0) return;
      const records = [...selectedIds].map((id) => recordsById.get(id)).filter((record) => record != null);
      if (records.length !== selectedIds.size) {
        appendAudit("archive.selection.invalid", {
          selected: selectedIds.size,
          resolved: records.length
        }, "ERROR");
        setStatusTone("error");
        return;
      }
      const catalog = { projects, records };
      try {
        const folder = await window.showDirectoryPicker({ id: "chatgpt-archive", mode: "readwrite" });
        controller = new AbortController();
        activeRunId = crypto.randomUUID();
        lastConversationIndex = -1;
        resetAudit();
        appendAudit("archive.start", {
          runId: activeRunId,
          mode: "selected",
          destination: folder.name,
          selectedCount: selectedIds.size,
          downloadAttachments: downloadAttachments.checked
        });
        setRunning(true);
        setStatusTone("neutral");
        progress.value = 0;
        const summary = await runArchive({
          root: folder,
          mode: "selected",
          selectedConversationIds: [...selectedIds],
          catalog,
          downloadAttachments: downloadAttachments.checked,
          signal: controller.signal,
          onProgress: update,
          onItemError: (itemError) => {
            appendAudit("archive.item.error", {
              runId: activeRunId,
              conversationId: itemError.conversationId,
              title: itemError.title,
              message: itemError.error
            }, "ERROR");
            setStatusTone("error");
          }
        });
        const hasErrors = summary.failedConversations > 0 || summary.failedMerges > 0 || summary.failedProjects > 0 || summary.failedAssets > 0 || summary.unresolvedAssets > 0;
        const hasWarnings = summary.incompleteProjects > 0 || summary.mergeWarnings > 0 || summary.incompleteSources > 0;
        appendAudit("archive.complete", {
          runId: activeRunId,
          summary: summaryText(summary)
        }, hasErrors ? "ERROR" : hasWarnings ? "WARN" : "INFO");
        setStatusTone(hasErrors ? "error" : hasWarnings ? "warning" : "success");
      } catch (error) {
        if ((error == null ? void 0 : error.name) === "AbortError") {
          appendAudit("archive.cancelled", {
            runId: activeRunId,
            message: "已写入的文件保留"
          }, "WARN");
          setStatusTone("warning");
        } else {
          appendAudit("archive.error", {
            runId: activeRunId,
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : void 0
          }, "ERROR");
          setStatusTone("error");
        }
      } finally {
        controller = null;
        activeRunId = null;
        setRunning(false);
      }
    };
    launch.addEventListener("click", () => {
      const opening = !panel.matches(":popover-open");
      panel.togglePopover(opening);
      if (opening) void initializeSources();
    });
    close.addEventListener("click", () => {
      panel.hidePopover();
    });
    for (const button of sortButtons) {
      button.addEventListener("click", () => {
        const field = button.dataset.sort;
        if (field === sortField) {
          sortDirection = sortDirection === "asc" ? "desc" : "asc";
        } else {
          sortField = field;
          sortDirection = field === "title" ? "asc" : "desc";
        }
        renderSource();
      });
    }
    source.addEventListener("change", () => {
      selectedIds.clear();
      search.value = "";
      const state = currentSourceState();
      if (state == null ? void 0 : state.loaded) renderSource();
      else void loadPage(true);
    });
    forgetConversationApiMode();
    downloadAttachments.checked = storedDownloadAttachments();
    downloadAttachments.addEventListener("change", () => {
      rememberDownloadAttachments(downloadAttachments.checked);
      appendAudit("archive.attachments.mode", { downloadAttachments: downloadAttachments.checked });
    });
    search.addEventListener("input", () => {
      renderSource();
    });
    copySeparator.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(SEARCH_SEPARATOR);
        copySeparator.textContent = `已复制 ${SEARCH_SEPARATOR}`;
        window.setTimeout(() => {
          copySeparator.textContent = SEARCH_SEPARATOR;
        }, 1200);
      } catch {
        appendAudit("search.separator.copy.warning", {}, "WARN");
        setStatusTone("warning");
      }
    });
    clearLog.addEventListener("click", () => {
      resetAudit();
      setStatusTone("neutral");
    });
    copyLog.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(auditEntries.join("\n\n"));
        copyLog.textContent = "已复制";
        window.setTimeout(() => {
          copyLog.textContent = "复制日志";
        }, 1200);
      } catch {
        appendAudit("log.copy.warning", {}, "WARN");
        setStatusTone("warning");
      }
    });
    refresh.addEventListener("click", () => {
      if (sourcesLoaded) void loadPage(true);
      else void initializeSources();
    });
    checkUpdates.addEventListener("click", () => {
      void checkCurrentSourceUpdates();
    });
    loadMore.addEventListener("click", () => {
      void loadPage(false);
    });
    loadAll.addEventListener("click", () => {
      void loadPage(false, true);
    });
    selectAll.addEventListener("change", () => {
      for (const input of selectionList.querySelectorAll(".cga-conversation-check")) {
        input.checked = selectAll.checked;
        if (selectAll.checked) selectedIds.add(input.value);
        else selectedIds.delete(input.value);
      }
      updateSelectionState();
    });
    exportSelected.addEventListener("click", () => {
      void start();
    });
    cancel.addEventListener("click", () => controller == null ? void 0 : controller.abort());
    setRunning(false);
  }
  mountUi();
  window.setInterval(mountUi, 1500);

})();