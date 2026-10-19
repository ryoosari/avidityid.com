---
title: "Magnetic Stripe Card Encoding: ISO Format Tracks Explained"
excerpt: "If you work with card reader/writer hardware, you've almost certainly encountered the term "ISO tracks." Magnetic stripe card encoding ISO format tracks define exactly how data is arranged on the stri"
author: "Avidity Id Team"
date: "2026-10-19"
category: "Education"
tags: ["stripe"]
seo_title: "Magnetic Stripe Card Encoding: ISO Format Tracks Explained |"
seo_description: "If you work with card reader/writer hardware, you've almost certainly encountered the term "ISO tracks." Magnetic stripe card encoding ISO format tracks de"
published: true
---

> **Key Takeaways:**
> - Magnetic stripe cards store data on up to three distinct tracks, each governed by ISO/IEC standards that define character sets, field lengths, and bit density.
> - Track 1 holds the most data (alphanumeric), Track 2 is the payment industry standard, and Track 3 is rarely used in modern systems.
> - Understanding magnetic stripe card encoding ISO format tracks is essential for anyone programming, troubleshooting, or integrating card reader/writer hardware.

If you work with card reader/writer hardware, you've almost certainly encountered the term "ISO tracks." Magnetic stripe card encoding ISO format tracks define exactly how data is arranged on the stripe — which characters are allowed, how many bits represent each one, and what separates one field from the next. Get this wrong and your card won't read on any compliant terminal. Get it right and your encoded cards work across virtually any standard reader worldwide.

This guide breaks down the three-track structure in plain terms, with enough technical detail to be useful whether you're writing software, debugging a bad read, or just trying to understand what your MSR hardware is actually doing.

---

## What Is a Magnetic Stripe?

A magnetic stripe is a band of iron-based magnetic particles laminated onto a card's surface. Data is encoded by magnetizing tiny regions of this stripe in one of two polarities — representing binary 1s and 0s. The stripe is divided into parallel longitudinal tracks, each independently readable.

The standards that govern this encoding are set by ISO/IEC 7811, a series of documents covering everything from card dimensions to the specific encoding format of each track. When hardware manufacturers and software developers follow these standards, cards encoded on one device can be read on any compliant reader — from bank ATMs to hotel key systems.

---

## The Three Tracks: Structure and Purpose

### Track 1

**Bit density:** 210 bits per inch (bpi)  
**Character encoding:** 7-bit alphanumeric (ALPHA format)  
**Max characters:** 79 characters  
**Character set:** Letters A–Z, digits 0–9, and a set of special characters including space, `!`, `"`, `#`, `$`, `%`, `&`, `'`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `/`, `:`, `;`, `<`, `=`, `>`, `?`, `@`

Track 1 was originally defined by the International Air Transport Association (IATA) and is sometimes called the IATA track. Because it uses 7 bits per character (6 data bits + 1 parity bit), it can encode the full alphanumeric range — including cardholder names.

**Typical Track 1 format for payment cards:**

```
%B1234567890123456^DOE/JOHN^2512101000000001000000030000000?
```

| Field | Content |
|---|---|
| `%` | Start sentinel |
| `B` | Format code (B = financial) |
| `1234567890123456` | Primary Account Number (PAN) |
| `^` | Field separator |
| `DOE/JOHN` | Cardholder name |
| `^` | Field separator |
| `2512` | Expiry date (YYMM) |
| `101` | Service code |
| `000...` | Discretionary data |
| `?` | End sentinel |

The LRC (Longitudinal Redundancy Check) character follows the end sentinel and is used for error detection — it's calculated automatically by compliant encoding hardware and software.

---

### Track 2

**Bit density:** 75 bits per inch (bpi)  
**Character encoding:** 4-bit numeric (BCD format)  
**Max characters:** 40 characters  
**Character set:** Digits 0–9 and a limited set of control characters (`: ; = ?`)

Track 2 is the workhorse of the payment industry. Defined by the American Bankers Association (ABA), it carries the core financial data that point-of-sale terminals, ATMs, and card readers actually use during a transaction. Because it uses only numeric characters, it stores less information than Track 1 but reads more reliably across older hardware.

**Typical Track 2 format:**

```
;1234567890123456=2512101000000001?
```

| Field | Content |
|---|---|
| `;` | Start sentinel |
| `1234567890123456` | Primary Account Number |
| `=` | Field separator |
| `2512` | Expiry date (YYMM) |
| `101` | Service code |
| `000000001` | Discretionary data |
| `?` | End sentinel |

When a card swipe "works," it's usually Track 2 doing the heavy lifting. Most payment terminals read Track 2 first and fall back to Track 1 only for cardholder name display or additional data.

---

### Track 3

**Bit density:** 210 bits per inch (bpi)  
**Character encoding:** 4-bit numeric  
**Max characters:** 107 characters

Track 3 was designed for updating card data in real time — think reloadable value cards or transaction counters. In practice, it never achieved widespread adoption. Most modern payment systems don't use it at all, and many card readers simply ignore it. You'll occasionally encounter Track 3 in transit systems or older proprietary loyalty card implementations, but for any new project, treat it as legacy.

---

## Service Codes: What That Three-Digit Field Actually Means

The service code on Tracks 1 and 2 is three digits that tell a terminal how to handle the card. Each digit position has a specific meaning:

**First digit — Interchange:**
- `1` — International interchange
- `2` — International interchange, chip required
- `5` — National interchange only
- `6` — National interchange only, chip required

**Second digit — Authorization:**
- `0` — Normal authorization
- `2` — By issuer only
- `4` — By issuer only, PIN required

**Third digit — PIN/services:**
- `0` — No restrictions
- `1` — PIN required
- `3` — PIN required where feasible
- `5` — Goods and services only (no cash)
- `6` — No restrictions, PIN required where feasible
- `7` — Goods and services only, PIN required

A service code of `101` means: international interchange, normal authorization, no restrictions. This is the most common code on standard credit and debit cards.

---

## Encoding Standards: What "HiCo" and "LoCo" Mean

Beyond the data format, magnetic stripes also differ in coercivity — how strongly the magnetic particles resist demagnetization.

| Type | Coercivity | Common Use |
|---|---|---|
| **LoCo** | ~300 Oe | Hotel keys, short-term access cards |
| **HiCo** | ~2750 Oe | Credit/debit cards, ID cards, long-term use |

HiCo cards are significantly more durable. They resist accidental erasure from proximity to magnets (phones, clasps) and are required for any card that needs to last years. Hardware like the [MSR606H](/downloads/msr606h-software) is specifically designed for HiCo encoding, making it the right tool for financial cards and durable ID credentials.

---

> **Did You Know:** The `%` and `;` start sentinels aren't arbitrary — they're defined in ISO/IEC 7811-2 and 7811-6 respectively. Any compliant reader uses these characters to detect the beginning of a track. If your reader isn't detecting card swipes, a corrupt or missing start sentinel is one of the first things to check in your encoded data.

---

## Practical Encoding Considerations

When working with card encoding software and hardware, keep these points in mind:

- **Parity errors** — Each character includes a parity bit. If your data comes out garbled, bit-level corruption often traces back to a write speed mismatch between your software and hardware.
- **LRC calculation** — Don't manually calculate this. Proper encoding software handles it automatically. If you're reading back a "bad LRC" error, the data itself was likely malformed before encoding.
- **Field length limits** — The PAN on Track 2 is capped at 19 digits by ISO 7812. Exceeding defined field lengths will cause reads to fail on compliant terminals.
- **Track ordering** — When encoding all three tracks, write Track 3 first, then Track 2, then Track 1. This prevents the write head from disturbing a freshly written track.

Software like [MSR90 software](/downloads/msr90-software) and the [MiniDX reader/writer](/downloads/minidx-software) handles these encoding details in the background, exposing a clean interface — but understanding what's happening at the track level helps you troubleshoot when cards don't behave as expected.

---

## Frequently Asked Questions

### What's the difference between Track 1 and Track 2 on a credit card?

Track 1 stores alphanumeric data including the cardholder's name — it uses a 7-bit character encoding and holds up to 79 characters. Track 2 is numeric only, encoded in 4-bit BCD, and holds up to 40 characters. Both carry the account number and expiry date, but payment terminals typically use Track 2 for authorization and Track 1 for display data like the cardholder name.

### Can I encode just one track and leave the others blank?

Yes. Encoding software lets you write to individual tracks independently. Many access control and loyalty card applications only use Track 2 (or sometimes Track 1), leaving the others blank or unused. Just be aware that some readers and terminals expect data on specific tracks and may throw errors if they detect an empty track where they expect data.

### Why do some cards fail to read even when the data looks correct?

The most common causes are coercivity mismatch (encoding a HiCo card with LoCo settings or vice versa), a damaged or contaminated read head, a worn card stripe, or subtle encoding errors like a malformed start sentinel or incorrect LRC. If your encoded data validates correctly in software but fails on external hardware, check the coercivity setting first — it's the most frequently overlooked variable.