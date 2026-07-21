# ADR-051: Qualify time-bound offers without collapsing product and purchase

- Status: Proposed
- Date: 2026-07-19

## Context

Planning compares product models, while shopping systems return regional variants, seller listings, dynamic offers, bundles, and fulfilment claims. Treating any listing as the selected product would hide voltage/radio/firmware differences, missing accessories, subscriptions, delivery risk, and total cost, while exposing shopping/payment authority to planning Agents.

## Decision

Use immutable Commercial Offer Snapshots, Procurement Bundle Requirements, and Procurement Candidate Assessments. Keep Product Model, variant/SKU, listing, offer, cart, order, delivered item, asset, and endpoint distinct. Qualify exact regional variant, bundle closure, evidence, terms, delivery, and total-cost basis before shortlist. Checkout/payment/fulfilment remain separate authority domains.

## Reason

This lets any shopping CLI provide replaceable market data without making a marketplace account or listing the household source of truth.

Chinese mirror: [`ADR-051-qualify-time-bound-offers-without-collapsing-product-and-purchase.zh-CN.md`](ADR-051-qualify-time-bound-offers-without-collapsing-product-and-purchase.zh-CN.md).
