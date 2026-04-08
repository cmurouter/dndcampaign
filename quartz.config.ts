import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Quartz 4",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Cinzel",         // classic D&D serif for headings
        body: "Crimson Text",     // readable book-style body font
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f4edd8",        // parchment background
          lightgray: "#d9c9a3",    // aged parchment border
          gray: "#a0896e",         // medium brown
          darkgray: "#3b2a1a",     // dark brown body text
          dark: "#1e0f00",         // near-black headings
          secondary: "#7a1c1c",    // deep burgundy red links
          tertiary: "#b8860b",     // dark gold hover
          highlight: "rgba(184, 134, 11, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#1a1008",        // very dark brown background
          lightgray: "#2e1f0e",    // dark parchment border
          gray: "#6b4f35",         // medium brown
          darkgray: "#c9b48a",     // warm tan body text
          dark: "#a3e8ac",         // light parchment headings
          secondary: "#c0392b",    // bright red links
          tertiary: "#d4a017",     // gold hover
          highlight: "rgba(212, 160, 23, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
