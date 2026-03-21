import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ThemeProvider from "@/components/ThemeProvider";
import { AppointmentModalProvider } from "@/components/appointments/AppointmentModalContext";
import AppointmentModal from "@/components/appointments/AppointmentModal";

const manrope = Manrope({
  variable: "--font-headline",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clínica Médica",
  description: "Dashboard de Agendamentos e Gestão de Pacientes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-surface text-on-surface">
        <ThemeProvider>
          <AppointmentModalProvider>
            <Sidebar />
            <div className="lg:ml-64 flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 p-12">
                {children}
              </main>
            </div>
            <AppointmentModal />
          </AppointmentModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}