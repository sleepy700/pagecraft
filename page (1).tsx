"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, CheckCircle2, Copy,
  ExternalLink, BookOpen, Loader2, PartyPopper, FolderGit2,
} from "lucide-react";

export default function AdminPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [repoName, setRepoName] = useState("");
  const [copied, setCopied] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("admin-progress");
    if (saved) setCurrentStep(Number(saved));
  }, []);

  const saveProgress = (step: number) => {
    setCurrentStep(step);
    localStorage.setItem("admin-progress", String(step));
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateRepoName = () => {
    setGenerating(true);
    setTimeout(() => {
      setRepoName("pagecraft");
      setGenerating(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-8">
      <div className="mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-amber-200">
            <BookOpen className="h-4 w-4 text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Admin Setup</span>
          </div>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-gray-900">
            Put Your Book Online
          </h1>
          <p className="mt-2 text-gray-600">Just 2 steps — 100% free, no card needed</p>
        </motion.div>

        {/* Progress */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {["GitHub", "Vercel"].map((label, i) => (
            <div key={label} className="flex items-center">
              <div
                className={`flex h-10 items-center gap-2 rounded-full border-2 px-4 ${
                  i < currentStep
                    ? "border-green-500 bg-green-500 text-white"
                    : i === currentStep
                      ? "border-amber-500 bg-amber-500 text-white"
                      : "border-gray-300 bg-white text-gray-400"
                }`}
              >
                {i < currentStep ? <CheckCircle2 size={18} /> : <span className="font-bold">{i + 1}</span>}
                <span className="text-sm font-semibold">{label}</span>
              </div>
              {i === 0 && (
                <div className={`h-0.5 w-12 sm:w-20 ${currentStep > 0 ? "bg-green-500" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mt-8 rounded-2xl bg-white p-6 sm:p-8 shadow-xl"
          >
            {currentStep === 0 && (
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-white">
                  <FolderGit2 size={28} />
                </div>
                <h2 className="mt-4 text-xl font-bold">Step 1: Save Code on GitHub</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Your website&apos;s master copy lives on GitHub — free forever
                </p>

                {!repoName ? (
                  <button
                    onClick={generateRepoName}
                    disabled={generating}
                    className="mt-6 w-full rounded-xl bg-gray-900 py-4 font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                  >
                    {generating ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="animate-spin" size={18} /> Preparing…
                      </span>
                    ) : (
                      "Start — I have a GitHub account"
                    )}
                  </button>
                ) : (
                  <div className="mt-6 space-y-4 text-left">
                    <div className="rounded-xl bg-amber-50 p-4 border border-amber-200">
                      <p className="text-xs font-bold text-amber-800">Repository name:</p>
                      <div className="mt-2 flex items-center gap-2">
                        <code className="flex-1 rounded-lg bg-white px-3 py-2 text-sm font-mono border">
                          {repoName}
                        </code>
                        <button
                          onClick={() => copyToClipboard(repoName)}
                          className="rounded-lg bg-amber-100 p-2 text-amber-700 hover:bg-amber-200"
                          aria-label="Copy name"
                        >
                          {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>

                    <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
                      <li>
                        Open{" "}
                        <a href="https://github.com/new" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">
                          github.com/new <ExternalLink className="inline" size={12} />
                        </a>
                      </li>
                      <li>
                        Name it <strong>{repoName}</strong>, keep it <strong>Public</strong>
                      </li>
                      <li>Click <strong>Create repository</strong></li>
                      <li>Ask me in the chat for your website files — I&apos;ll give you a zip to upload via <em>&quot;upload files&quot;</em></li>
                    </ol>

                    <button
                      onClick={() => saveProgress(1)}
                      className="w-full rounded-xl border-2 border-gray-900 py-3 font-semibold hover:bg-gray-50"
                    >
                      Done — Next Step →
                    </button>
                  </div>
                )}
              </div>
            )}

            {currentStep === 1 && !deployed && (
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white">
                  <Rocket size={28} />
                </div>
                <h2 className="mt-4 text-xl font-bold">Step 2: Go Live on Vercel</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Free hosting — your site goes live worldwide in ~2 minutes
                </p>

                <div className="mt-6 space-y-4 text-left">
                  <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
                    <li>
                      Open{" "}
                      <a href="https://vercel.com/signup" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">
                        vercel.com/signup <ExternalLink className="inline" size={12} />
                      </a>{" "}
                      and choose <strong>Continue with GitHub</strong>
                    </li>
                    <li>Click <strong>Import</strong> next to your <code className="font-mono text-xs bg-gray-100 px-1 rounded">pagecraft</code> repo</li>
                    <li>
                      No settings needed — this site has <strong>no database</strong>, just press{" "}
                      <strong>Deploy</strong>
                    </li>
                  </ol>

                  <div className="rounded-xl bg-green-50 p-4 border border-green-200">
                    <p className="text-xs font-bold text-green-800">You get:</p>
                    <p className="mt-1 text-xs text-green-700">
                      A free worldwide address like <code className="font-mono">book-hub-store.vercel.app</code> —
                      live 24×7, updates automatically whenever GitHub changes.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setDeployed(true);
                      saveProgress(2);
                    }}
                    className="w-full rounded-xl border-2 border-gray-900 py-3 font-semibold hover:bg-gray-50"
                  >
                    It&apos;s Live! 🎉
                  </button>
                </div>
              </div>
            )}

            {(currentStep >= 2 || deployed) && (
              <div className="text-center py-8">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6 }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600"
                >
                  <PartyPopper size={40} />
                </motion.div>
                <h2 className="mt-4 text-2xl font-bold text-gray-900">Badhai ho!</h2>
                <p className="mt-2 text-gray-600">Your bookstore is now live on the internet — worldwide.</p>
                <div className="mt-6 rounded-xl bg-gray-50 p-4 text-left">
                  <p className="text-xs font-bold text-gray-700">Future updates are easy:</p>
                  <p className="mt-1 text-xs text-gray-600">
                    Change <code className="font-mono bg-white px-1 rounded">src/lib/catalog.ts</code> on
                    GitHub → Vercel updates your live site automatically. Or just message me and I&apos;ll
                    do the edit for you.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={() => saveProgress(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-white disabled:opacity-30"
          >
            ← Back
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Stuck anywhere? Send a screenshot in the chat — I&apos;ll tell you the next click.
        </p>
      </div>
    </div>
  );
}
