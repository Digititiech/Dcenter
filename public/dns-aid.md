# DNS-AID (DNS for AI Discovery) Configuration Guide

This guide provides the exact records you need to publish in your **DNS Manager** (e.g., Cloudflare, Hostinger DNS, Namecheap) for `dcenterfe.com` to enable decentralized AI agent discovery.

## 1. BIND Zone File Format

If your DNS provider supports importing zone files, copy and paste the following records:

```text
; --- DNS-AID Discovery Records for dcenterfe.com ---

; 1. Agent Directory Index Records
_index._agents.dcenterfe.com.      3600 IN HTTPS 1 www.dcenterfe.com. alpn="h3,h2,http/1.1" port=443
_index._agents.dcenterfe.com.      3600 IN SVCB  1 www.dcenterfe.com. alpn="h3,h2,http/1.1" port=443
_index._agents.dcenterfe.com.      3600 IN TXT   "api-catalog=https://www.dcenterfe.com/.well-known/api-catalog" "agent-card=https://www.dcenterfe.com/.well-known/agent-card.json"

; 2. Model Context Protocol (MCP) Agent Discovery Records
_mcp._agents.dcenterfe.com.        3600 IN HTTPS 1 www.dcenterfe.com. alpn="mcp" port=443
_mcp._agents.dcenterfe.com.        3600 IN SVCB  1 www.dcenterfe.com. alpn="mcp" port=443
_mcp._agents.dcenterfe.com.        3600 IN TXT   "mcp-server-card=https://www.dcenterfe.com/.well-known/mcp/server-card.json"

; 3. Agent-to-Agent (A2A) Routing Records
_a2a._agents.dcenterfe.com.        3600 IN HTTPS 1 www.dcenterfe.com. alpn="a2a" port=443
_a2a._agents.dcenterfe.com.        3600 IN SVCB  1 www.dcenterfe.com. alpn="a2a" port=443


; --- Fallback Records for www.dcenterfe.com ---

; 1. Agent Directory Index (WWW)
_index._agents.www.dcenterfe.com.  3600 IN HTTPS 1 www.dcenterfe.com. alpn="h3,h2,http/1.1" port=443
_index._agents.www.dcenterfe.com.  3600 IN SVCB  1 www.dcenterfe.com. alpn="h3,h2,http/1.1" port=443
_index._agents.www.dcenterfe.com.  3600 IN TXT   "api-catalog=https://www.dcenterfe.com/.well-known/api-catalog" "agent-card=https://www.dcenterfe.com/.well-known/agent-card.json"

; 2. MCP Agent Discovery (WWW)
_mcp._agents.www.dcenterfe.com.    3600 IN HTTPS 1 www.dcenterfe.com. alpn="mcp" port=443
_mcp._agents.www.dcenterfe.com.    3600 IN SVCB  1 www.dcenterfe.com. alpn="mcp" port=443
_mcp._agents.www.dcenterfe.com.    3600 IN TXT   "mcp-server-card=https://www.dcenterfe.com/.well-known/mcp/server-card.json"

; 3. Agent-to-Agent (A2A) Routing (WWW)
_a2a._agents.www.dcenterfe.com.    3600 IN HTTPS 1 www.dcenterfe.com. alpn="a2a" port=443
_a2a._agents.www.dcenterfe.com.    3600 IN SVCB  1 www.dcenterfe.com. alpn="a2a" port=443
```

---

## 2. Cloudflare / Hostinger GUI Manual Configuration

If configuring via a visual control panel, enter the records manually:

### 1. Directory Index (`_index._agents`)
| Type | Name | Priority | Target | Value / Parameters |
| :--- | :--- | :--- | :--- | :--- |
| **HTTPS** | `_index._agents` | `1` | `www.dcenterfe.com` | `alpn="h3,h2,http/1.1" port=443` |
| **SVCB** | `_index._agents` | `1` | `www.dcenterfe.com` | `alpn="h3,h2,http/1.1" port=443` |
| **TXT** | `_index._agents` | N/A | N/A | `"api-catalog=https://www.dcenterfe.com/.well-known/api-catalog" "agent-card=https://www.dcenterfe.com/.well-known/agent-card.json"` |

### 2. Model Context Protocol (`_mcp._agents`)
| Type | Name | Priority | Target | Value / Parameters |
| :--- | :--- | :--- | :--- | :--- |
| **HTTPS** | `_mcp._agents` | `1` | `www.dcenterfe.com` | `alpn="mcp" port=443` |
| **SVCB** | `_mcp._agents` | `1` | `www.dcenterfe.com` | `alpn="mcp" port=443` |
| **TXT** | `_mcp._agents` | N/A | N/A | `"mcp-server-card=https://www.dcenterfe.com/.well-known/mcp/server-card.json"` |

### 3. Agent-to-Agent (`_a2a._agents`)
| Type | Name | Priority | Target | Value / Parameters |
| :--- | :--- | :--- | :--- | :--- |
| **HTTPS** | `_a2a._agents` | `1` | `www.dcenterfe.com` | `alpn="a2a" port=443` |
| **SVCB** | `_a2a._agents` | `1` | `www.dcenterfe.com` | `alpn="a2a" port=443` |

*(Note: Repeat the same settings prefixing the Names with `_index._agents.www`, `_mcp._agents.www`, and `_a2a._agents.www` if you wish to configure www-specific subdomains.)*

---

## 3. Verification

Once the records are saved, you can verify they are public using `dig` in your terminal:

```bash
# Query HTTPS Discovery Record
dig +short HTTPS _index._agents.dcenterfe.com

# Query SVCB Discovery Record
dig +short SVCB _mcp._agents.dcenterfe.com

# Query Directory TXT metadata
dig +short TXT _index._agents.dcenterfe.com
```
