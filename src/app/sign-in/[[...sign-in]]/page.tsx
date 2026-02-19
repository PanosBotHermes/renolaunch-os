import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-reno-bg">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/8 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo / title */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[14px] bg-gradient-to-br from-indigo-500/30 to-violet-500/30 text-2xl shadow-[0_0_30px_rgba(99,102,241,0.3)]">
            🚀
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-reno-text-1">RenoLaunch OS</h1>
          <p className="mt-1 text-sm text-reno-text-2">Agency Command Center</p>
        </div>

        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-white/[0.04] border border-white/10 shadow-2xl shadow-black/40 backdrop-blur-[20px] rounded-[16px] p-8",
              headerTitle: "text-reno-text-1 text-lg font-semibold",
              headerSubtitle: "text-reno-text-2 text-sm",
              socialButtonsBlockButton: "bg-white/[0.06] border border-white/10 text-reno-text-1 hover:bg-white/[0.1] transition-all rounded-[10px] h-11",
              socialButtonsBlockButtonText: "text-reno-text-1 font-medium text-sm",
              dividerLine: "bg-white/10",
              dividerText: "text-reno-text-3 text-xs",
              formFieldLabel: "text-reno-text-2 text-sm font-medium",
              formFieldInput: "bg-white/[0.035] border border-white/10 text-reno-text-1 rounded-[10px] h-11 px-3 text-sm placeholder:text-reno-text-3 focus:border-indigo-400/70 focus:ring-2 focus:ring-indigo-500/15 outline-none transition-all",
              formButtonPrimary: "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-medium rounded-[10px] h-11 text-sm transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]",
              footerActionText: "text-reno-text-3 text-sm",
              footerActionLink: "text-indigo-400 hover:text-indigo-300 text-sm font-medium",
              identityPreviewText: "text-reno-text-1 text-sm",
              identityPreviewEditButton: "text-indigo-400 hover:text-indigo-300",
              formFieldErrorText: "text-rose-400 text-xs mt-1",
              alertText: "text-reno-text-2 text-sm",
              internal: "hidden",
            },
            variables: {
              colorBackground: "transparent",
              colorText: "#E8EDF5",
              colorTextSecondary: "#8896A4",
              colorPrimary: "#6366F1",
              colorDanger: "#F43F5E",
              borderRadius: "10px",
              fontFamily: "Inter, system-ui, sans-serif",
            },
          }}
        />
      </div>
    </div>
  );
}
