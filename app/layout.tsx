import type { Metadata } from "next";
import { Inter, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EaglePredict – Free Daily Football Predictions & Tips",
    template: "%s | EaglePredict",
  },
  description:
    "Get free daily football predictions, tips and analysis for all major leagues. Expert picks for Premier League, La Liga, Champions League, Serie A, Bundesliga and more.",
  keywords: ["football predictions", "soccer tips", "free predictions", "betting tips", "football analysis"],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://eaglepredict.com",
    siteName: "EaglePredict",
    title: "EaglePredict – Free Daily Football Predictions & Tips",
    description: "Free daily football predictions, tips and analysis for all major leagues.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EaglePredict – Free Daily Football Predictions",
    description: "Free daily football predictions, tips and analysis for all major leagues.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${beVietnamPro.variable} font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: { borderRadius: "8px", padding: "12px 16px" },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
