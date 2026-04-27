// src/components/PublicationsTimeline/index.jsx
// Drop this file into your Docusaurus project at src/components/PublicationsTimeline/index.jsx
// Then import it in any .mdx page with:  import PublicationsTimeline from '@site/src/components/PublicationsTimeline';

import React, { useState, useMemo } from "react";

// ─── Inline styles (avoids Docusaurus CSS module conflicts) ──────────────────

const TEAL = "var(--ifm-color-primary, #0ea5a0)";
const TEAL_BG = "var(--ifm-color-primary-lightest, #e6f8f8)";
const BORDER = "var(--ifm-color-emphasis-200, #e5e7eb)";
const TEXT_MUTED = "var(--ifm-color-emphasis-600, #6b7280)";
const TEXT_HEADING = "var(--ifm-heading-color, #111827)";
const CARD_BG = "var(--ifm-card-background-color, #ffffff)";
const SURFACE = "var(--ifm-background-surface-color, #f9fafb)";

const styles = {
  wrapper: {
    fontFamily: "var(--ifm-font-family-base, sans-serif)",
    maxWidth: 860,
    margin: "0 auto",
    padding: "0 0 3rem",
  },
  filterBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginBottom: "2.5rem",
    padding: "1rem 1.25rem",
    background: SURFACE,
    borderRadius: 12,
    border: `1px solid ${BORDER}`,
  },
  filterLabel: {
    fontSize: "0.75rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: TEXT_MUTED,
    alignSelf: "center",
    marginRight: "0.25rem",
  },
  filterBtn: (active) => ({
    padding: "0.35rem 0.9rem",
    borderRadius: 20,
    border: active ? `2px solid ${TEAL}` : `2px solid ${BORDER}`,
    background: active ? TEAL_BG : "transparent",
    color: active ? TEAL : TEXT_MUTED,
    fontWeight: active ? 700 : 500,
    fontSize: "0.8rem",
    cursor: "pointer",
    transition: "all 0.15s ease",
    lineHeight: 1.4,
  }),
  timeline: {
    position: "relative",
    paddingLeft: "2.5rem",
  },
  timelineRule: {
    position: "absolute",
    left: "0.875rem",
    top: 0,
    bottom: 0,
    width: 2,
    background: `linear-gradient(to bottom, ${TEAL}, ${BORDER})`,
    borderRadius: 2,
    zIndex: 0,
  },
  yearGroup: {
    marginBottom: "1.75rem",
  },
  yearLabel: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    marginLeft: "-2.5rem",
  },
  yearDot: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: TEAL,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    zIndex: 1,
    boxShadow: `0 0 0 4px ${TEAL_BG}`,
  },
  yearDotInner: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#fff",
  },
  yearText: {
    marginLeft: "0.75rem",
    fontWeight: 800,
    fontSize: "1.15rem",
    letterSpacing: "-0.01em",
    color: TEXT_HEADING,
  },
  yearBadge: {
    marginLeft: "0.5rem",
    fontSize: "0.7rem",
    fontWeight: 700,
    background: TEAL_BG,
    color: TEAL,
    padding: "0.15rem 0.5rem",
    borderRadius: 10,
  },
  card: {
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    borderLeft: `4px solid ${TEAL}`,
    borderRadius: 10,
    padding: "1rem 1.25rem",
    marginBottom: "0.75rem",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    transition: "box-shadow 0.15s ease, transform 0.15s ease",
  },
  inPressBadge: null,
  cardTitle: {
    fontSize: "0.95rem",
    fontWeight: 700,
    color: TEXT_HEADING,
    lineHeight: 1.45,
    marginBottom: "0.35rem",
    margin: 0,
  },
  cardAuthors: {
    fontSize: "0.8rem",
    color: TEXT_MUTED,
    marginTop: "0.3rem",
    marginBottom: "0.25rem",
    lineHeight: 1.5,
  },
  cardMeta: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  journalChip: {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: TEAL,
    background: TEAL_BG,
    padding: "0.15rem 0.55rem",
    borderRadius: 4,
    flexShrink: 0,
  },
  detailsText: {
    fontSize: "0.75rem",
    color: TEXT_MUTED,
  },
  metaLinks: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "0.6rem",
  },
  doiLink: {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: TEAL,
    textDecoration: "none",
    padding: "0.2rem 0.6rem",
    border: `1px solid ${TEAL}`,
    borderRadius: 4,
    transition: "background 0.15s ease",
    lineHeight: 1.4,
  },
  pubmedLink: {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: TEXT_MUTED,
    textDecoration: "none",
    padding: "0.2rem 0.6rem",
    border: `1px solid ${BORDER}`,
    borderRadius: 4,
    transition: "background 0.15s ease",
    lineHeight: 1.4,
  },
  emptyState: {
    textAlign: "center",
    padding: "3rem 0",
    color: TEXT_MUTED,
  },
};

// ─── Month helpers ───────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(year, month) {
  if (!year) return null;
  if (!month) return String(year);
  return `${MONTH_NAMES[month]} ${year}`;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function PublicationCard({ pub }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        boxShadow: hovered
          ? "0 4px 16px rgba(14,165,160,0.12)"
          : "0 1px 4px rgba(0,0,0,0.05)",
        transform: hovered ? "translateX(3px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p style={styles.cardTitle}>{pub.title}</p>
      <p style={styles.cardAuthors}>{pub.authors}</p>

      <div style={styles.cardMeta}>
        <span style={styles.journalChip}>{pub.journal}</span>
        {pub.details && (
          <span style={styles.detailsText}>{pub.details}</span>
        )}
      </div>

      <div style={styles.metaLinks}>
        {pub.url && (
          <a
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.doiLink}
          >
            DOI →
          </a>
        )}
        {pub.pmid && (
          <a
            href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.pubmedLink}
          >
            PubMed
          </a>
        )}
        {pub.pmcid && (
          <a
            href={`https://www.ncbi.nlm.nih.gov/pmc/articles/${pub.pmcid}/`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.pubmedLink}
          >
            PMC
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

/**
 * PublicationsTimeline
 *
 * Props:
 *   publications  — array of publication objects (see /src/data/publications.js)
 *   showFilters   — boolean, show the year-range filter bar (default: true)
 */
export default function PublicationsTimeline({
  publications = [],
  showFilters = true,
}) {
  // Derive year list
  const years = useMemo(() => {
    const ys = [...new Set(publications.map((p) => p.year).filter(Boolean))];
    return ys.sort((a, b) => b - a); // newest first
  }, [publications]);

  const decades = useMemo(() => {
    const ds = [...new Set(years.map((y) => Math.floor(y / 10) * 10))];
    return ds.sort((a, b) => b - a);
  }, [years]);

  const [activeFilter, setActiveFilter] = useState("all");

  // Group publications by year, newest first
  const grouped = useMemo(() => {
    const sorted = [...publications].sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return (b.month || 0) - (a.month || 0);
    });

    const filtered = sorted.filter((p) => {
      if (activeFilter === "all") return true;
      if (typeof activeFilter === "number")
        return p.year && Math.floor(p.year / 10) * 10 === activeFilter;
      return true;
    });

    const groups = {};
    filtered.forEach((p) => {
      const key = String(p.year);
      if (!groups[key]) groups[key] = { label: key, year: p.year, pubs: [] };
      groups[key].pubs.push(p);
    });

    return Object.values(groups).sort((a, b) => b.year - a.year);
  }, [publications, activeFilter]);

  const totalVisible = grouped.reduce((sum, g) => sum + g.pubs.length, 0);

  return (
    <div style={styles.wrapper}>
      {/* Filter bar — commented out, set showFilters={true} on the component to re-enable */}
      {/* {showFilters && (
        <div style={styles.filterBar}>
          <span style={styles.filterLabel}>Filter:</span>
          <button
            style={styles.filterBtn(activeFilter === "all")}
            onClick={() => setActiveFilter("all")}
          >
            All ({publications.length})
          </button>
          {decades.map((d) => {
            const count = publications.filter(
              (p) => p.year && Math.floor(p.year / 10) * 10 === d
            ).length;
            return (
              <button
                key={d}
                style={styles.filterBtn(activeFilter === d)}
                onClick={() => setActiveFilter(d)}
              >
                {d}s ({count})
              </button>
            );
          })}
          {hasInPress && (
            <button
              style={styles.filterBtn(activeFilter === "inpress")}
              onClick={() => setActiveFilter("inpress")}
            >
              In Press ({publications.filter((p) => p.inPress).length})
            </button>
          )}
        </div>
      )} */}

      {/* Timeline */}
      {totalVisible === 0 ? (
        <div style={styles.emptyState}>No publications match this filter.</div>
      ) : (
        <div style={styles.timeline}>
          <div style={styles.timelineRule} />
          {grouped.map((group) => (
            <div key={group.label} style={styles.yearGroup}>
              {/* Year header */}
              <div style={styles.yearLabel}>
                <div style={styles.yearDot}>
                  <div style={styles.yearDotInner} />
                </div>
                <span style={styles.yearText}>
                  {group.label}
                </span>
                <span style={styles.yearBadge}>{group.pubs.length}</span>
              </div>

              {/* Publication cards */}
              {group.pubs.map((pub) => (
                <PublicationCard key={pub.id} pub={pub} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}