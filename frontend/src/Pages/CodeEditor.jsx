import Editor from "@monaco-editor/react"
import { useState } from "react";
import axios from "../api/axiosInstance";
// import { useAuth } from "../Context/AuthContext";

const starterCode = {
    javascript: `// Write your solution here
// Read input using: const lines = require('fs').readFileSync('/dev/stdin','utf8').split('\\n')

`,
    python: `# Write your solution here
# Read input using: input()
# Example:
# t = int(input())
# for _ in range(t):
#     x = int(input())
#     print(x)

`,
java: `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Write your solution here
    }
}`
}

export function CodeEditor({onSubmit,problemId} ) {
    const [language, setLanguage] = useState("javascript")
    const [code, setCode] = useState(starterCode["javascript"])
    const [result, setResult] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    // const{token}=useAuth()

    const handleLanguageChange = (e) => {
        const selected = e.target.value
        setLanguage(selected)
        setCode(starterCode[selected])
    }

 const handleSubmit = async () => {
    setSubmitting(true)
    setResult(null)
    console.log("Button clicked")
    try {
        if (onSubmit) {
            // Battle mode - send through WebSocket
            onSubmit(code, language)
            setResult({ 
                success: true, 
                output: "Submitted! Waiting for result..." 
            })
        } else {
            // Practice mode - send through HTTP like before
            const endpoint = problemId 
                 ? `/api/submission/run-with-tests/${problemId}`
                : `/api/submission/run`;


            const response = await axios.post(endpoint, {
                code: code,
                language: language.toUpperCase()
                });
               console.log(response.data)
                setResult(response.data);
                }
    } catch (error) {
        console.log("Error:", error)
        setResult({
            success: false,
            output: "",
            error: "Failed to connect to server"
        })
    } finally {
        setSubmitting(false)
    }
}

    return (
        <div className="flex flex-col h-full">

            {/* Toolbar */}
            <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm font-medium">Language:</span>
                    <select
                        value={language}
                        onChange={handleLanguageChange}
                        className="bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                    </select>
                </div>

                {/* Submit button */}
                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white text-sm font-semibold px-5 py-1.5 rounded-lg transition-colors duration-200"
                >
                    {submitting ? "Running..." : "Submit ⚡"}
                </button>
            </div>

            {/* Editor */}
            <Editor
                height="60vh"
                language={language}
                value={code}
                onChange={(value) => setCode(value)}
                theme="vs-dark"
                options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16 }
                }}
            />

            {/* Result box */}
            {result && (
                <div className={`mx-4 my-3 p-4 rounded-lg border font-mono text-sm ${
                    result.success
                        ? "bg-green-50 border-green-200 text-green-800"
                        : "bg-red-50 border-red-200 text-red-800"
                }`}>
                    <p className="font-semibold mb-2">
                        {result.success ? "✅ Success" : "❌ Error"}
                    </p>
                    <pre className="whitespace-pre-wrap">
                        {result.success ? result.output : result.error}
                    </pre>
                </div>
            )}
        </div>
    )
}