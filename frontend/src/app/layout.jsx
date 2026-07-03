import '../styles/globals.css';
import "./globals.css";

export const metadata = { title: 'Smart Digital Library', description: 'ABU Zaria Library Resource Recommendation System' };

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
