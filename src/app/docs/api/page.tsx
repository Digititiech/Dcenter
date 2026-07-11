import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ApiDocs() {
  return (
    <>
      <Header locale="en" />
      <main className="flex-grow pt-28 pb-16 px-margin-mobile md:px-margin-desktop bg-background max-w-container-max mx-auto w-full">
        <div className="max-w-3xl">
          <h1 className="font-display-lg text-display-lg text-foreground mb-4">
            Developer API Documentation
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
            Access Decision Center&apos;s expert AI financial consulting engine programmatically. 
            We expose a secure, RESTful endpoint for conversational analysis, structural restructuring, and advisory tasks.
          </p>

          <div className="border border-outline-variant/30 bg-surface-container-high/30 p-6 mb-8 rounded-none">
            <h2 className="text-xl font-semibold mb-4 text-secondary">Authentication</h2>
            <p className="font-body-md text-on-surface-variant mb-4">
              All requests must include a valid API token in the authorization header:
            </p>
            <pre className="bg-surface-container-high p-4 text-sm text-foreground overflow-x-auto border border-outline-variant/20">
              <code>Authorization: Bearer YOUR_API_TOKEN</code>
            </pre>
            <p className="font-body-md text-on-surface-variant mt-4">
              To request a token, refer to the registration guide at {" "}
              <Link href="/auth.md" className="text-secondary underline hover:brightness-110">
                auth.md
              </Link>.
            </p>
          </div>

          <div className="border border-outline-variant/30 bg-surface-container-high/30 p-6 mb-8 rounded-none">
            <h2 className="text-xl font-semibold mb-4 text-secondary">Endpoints</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-foreground flex items-center gap-3">
                <span className="bg-secondary/20 text-secondary text-xs px-2.5 py-1 font-bold">POST</span>
                <code>/api/chat</code>
              </h3>
              <p className="font-body-md text-on-surface-variant mt-2 mb-4">
                Chat with the Decision Center sovereign financial advisory expert.
              </p>
              
              <h4 className="text-sm font-semibold mb-2 text-foreground">Request Headers</h4>
              <pre className="bg-surface-container-high p-4 text-sm text-foreground mb-4 overflow-x-auto border border-outline-variant/20">
                <code>{`Content-Type: application/json\nAuthorization: Bearer <your-key>`}</code>
              </pre>

              <h4 className="text-sm font-semibold mb-2 text-foreground">Request Payload</h4>
              <pre className="bg-surface-container-high p-4 text-sm text-foreground mb-4 overflow-x-auto border border-outline-variant/20">
                <code>{`{\n  "messages": [\n    { "role": "user", "text": "What restructuring strategies are typical in Oman?" }\n  ],\n  "locale": "en"\n}`}</code>
              </pre>

              <h4 className="text-sm font-semibold mb-2 text-foreground">Response Body (200 OK)</h4>
              <pre className="bg-surface-container-high p-4 text-sm text-foreground overflow-x-auto border border-outline-variant/20">
                <code>{`{\n  "text": "Restructuring in Oman typically involves renegotiating credit terms, consolidating debt through local institutions, and optimizing capital deployment..."\n}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </main>
      <Footer locale="en" />
    </>
  );
}
