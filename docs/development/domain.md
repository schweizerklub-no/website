# Domain & DNS

The apex domain `schweizerklub.no` is registered with **Nexthop AS** (registrar for `.no` domains).

## Key points

- **Registrar**: Nexthop AS
- **TLD**: `.no` (handled by Norid)
- **Current nameservers**: `chuck.ns.cloudflare.com`, `danica.ns.cloudflare.com` (Cloudflare). If nameservers need to change, contact Nexthop AS to update them.
- **Custom domain on Cloudflare Pages**: `schweizerklub.no` (apex) is attached to the Pages project `schweizerklub-no`. See [Cloudflare](cloudflare.md) for details on the redirect from `www.schweizerklub.no` to the apex.

## Verification

Check nameservers (Cloudflare):

```sh
whois schweizerklub.no -h whois.norid.no 2>&1 | awk '/Name Server Handle/ {h=$NF; system("whois -h whois.norid.no " h " 2>&1 | awk -F\": +\" \"/Name Server Hostname/ {print \\$2}\"")}'
```