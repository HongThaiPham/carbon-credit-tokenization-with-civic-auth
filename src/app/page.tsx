/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRight, Leaf, Shield, Zap, BarChart3 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b container mx-auto">
        <Link className="flex items-center justify-center" href="#">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="ml-2 text-xl font-bold">
            Carbon Credit Tokenization Platform
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#how-it-works"
          >
            How It Works
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#about"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#contact"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Carbon Credit Tokenization on Solana
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Transform environmental impact into digital assets. Our
                  platform enables transparent, efficient, and secure trading of
                  carbon credits on the Solana blockchain.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href={"/trader/swap"}>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-xl">
                  <img
                    alt="Carbon credit visualization"
                    className="object-cover"
                    src="/placeholder.svg?height=400&width=600"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32" id="features">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Why Choose Our Platform
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our carbon credit tokenization platform offers unique
                  advantages powered by Solana blockchain technology.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Shield className="h-12 w-12 text-green-600" />
                <h3 className="text-xl font-bold">Secure & Transparent</h3>
                <p className="text-center text-gray-500">
                  Blockchain-based verification ensures complete transparency
                  and security for all carbon credit transactions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Zap className="h-12 w-12 text-green-600" />
                <h3 className="text-xl font-bold">Fast Transactions</h3>
                <p className="text-center text-gray-500">
                  Solana&apos;s high-speed blockchain enables near-instant
                  settlement of carbon credit trades.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <BarChart3 className="h-12 w-12 text-green-600" />
                <h3 className="text-xl font-bold">Market Analytics</h3>
                <p className="text-center text-gray-500">
                  Advanced analytics tools to track carbon credit performance
                  and market trends.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-green-50"
          id="how-it-works"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  How Our Platform Works
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform simplifies the process of tokenizing, trading,
                  and retiring carbon credits on the Solana blockchain.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                      1
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">Verification</h3>
                      <p className="text-gray-500">
                        Carbon credits are verified by certified authorities
                        before tokenization.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                      2
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">Tokenization</h3>
                      <p className="text-gray-500">
                        Credits are converted into digital tokens on the Solana
                        blockchain.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                      3
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">Trading</h3>
                      <p className="text-gray-500">
                        Tokens can be bought, sold, or traded on our marketplace
                        with minimal fees.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-square rounded-xl overflow-hidden shadow-xl">
                  <img
                    alt="Platform workflow diagram"
                    className="object-cover"
                    src="/placeholder.svg?height=500&width=500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32" id="about">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join the Green Revolution
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Be part of the solution to climate change with our innovative
                  carbon credit platform.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-green-600 hover:bg-green-700 text-lg">
                  Connect Wallet
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="text-lg">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-600" />
          <p className="text-sm text-gray-500">
            © 2025 Carbon Credit Tokenization Platform. All rights reserved.
          </p>
        </div>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-sm hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
          <Link className="text-sm hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
}
