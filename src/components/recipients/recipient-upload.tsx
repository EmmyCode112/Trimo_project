"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileText, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RecipientUpload({ onUpload }) {
  const [file, setFile] = useState(null)
  const [recipients, setRecipients] = useState([])
  const [error, setError] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError("")
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file")
      return
    }

    setIsUploading(true)

    try {
      const reader = new FileReader()
      reader.onload = (event) => {
        const csv = event.target.result
        const lines = csv.split("\n")
        const headers = lines[0].split(",")

        // Find email column index
        const emailIndex = headers.findIndex(
          (header) => header.toLowerCase().trim() === "email" || header.toLowerCase().trim() === "email address",
        )

        if (emailIndex === -1) {
          setError("CSV file must contain an 'email' column")
          setIsUploading(false)
          return
        }

        const parsedRecipients = []

        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim() === "") continue

          const values = lines[i].split(",")
          const email = values[emailIndex].trim()

          if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            parsedRecipients.push({ email })
          }
        }

        if (parsedRecipients.length === 0) {
          setError("No valid email addresses found in the CSV file")
          setIsUploading(false)
          return
        }

        setRecipients(parsedRecipients)
        onUpload(parsedRecipients)
        setIsUploading(false)
      }

      reader.readAsText(file)
    } catch (err) {
      setError("Error processing CSV file")
      setIsUploading(false)
    }
  }

  const handleManualEntry = () => {
    onUpload([])
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Upload Recipients</h2>
        <p className="text-muted-foreground">Upload a CSV file with your recipients or enter them manually</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="csv">CSV File</Label>
              <div className="flex gap-2">
                <Input id="csv" type="file" accept=".csv" onChange={handleFileChange} className="flex-1" />
                <Button
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  className="bg-[#383268] hover:bg-[#2a2550]"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">CSV file must include an email column</p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex items-center">
              <div className="flex-grow h-px bg-gray-200"></div>
              <span className="px-4 text-sm text-gray-400">OR</span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </div>

            <Button variant="outline" onClick={handleManualEntry} className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              Enter Recipients Manually
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

