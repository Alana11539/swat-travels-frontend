import "./globals.css"

export const metadata = {
  title: "Swat Gilgit Travels - Live The Mountain Adventure",
  description: "Explore Pakistan's northern beauty with unforgettable journeys through Swat, Hunza, Gilgit and beyond.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
