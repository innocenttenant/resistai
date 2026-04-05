"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Brain, Sparkles, AlertTriangle, CheckCircle, Info, Activity } from "lucide-react"
import { Chatbot } from "@/components/dashboard/chatbot"
import { toast } from "sonner"

export default function ResistAIPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  
  // State for all model parameters
  const [formData, setFormData] = useState({
    age: "",
    gender: "1", // Default 1 (Male)
    diabetes: false,
    hypertension: false,
    kidneyInfections: false,
    allergies: "",
    hospital_before: "",
    infection_freq: "",
    bacteria_name: ""
  })

  const [predictionResults, setPredictionResults] = useState<any>(null)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleRunPrediction = async () => {
    // Basic validation
    if (!formData.age || !formData.hospital_before || !formData.infection_freq || !formData.bacteria_name) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsAnalyzing(true)
    
    try {
      const payload = {
        age: parseFloat(formData.age),
        gender: parseInt(formData.gender),
        diabetes: formData.diabetes ? 1 : 0,
        hypertension: formData.hypertension ? 1 : 0,
        kidneyInfections: formData.kidneyInfections ? 1 : 0,
        allergies: formData.allergies,
        hospital_before: parseInt(formData.hospital_before),
        infection_freq: parseInt(formData.infection_freq),
        bacteria_name: formData.bacteria_name
      }

      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error("Failed to connect to AI backend.")
      }

      const data = await response.json()
      setPredictionResults(data)
      setShowResults(true)
      toast.success("Prediction complete! Patient record saved securely.");
    } catch (error) {
      console.error(error)
      toast.error("Error analyzing sample. Please ensure backend is running.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Find the top result from all_results to show the confidence of that option
  const topRiskObj = predictionResults?.all_results?.find((r: any) => r.drug === predictionResults.top_drug)
  const highestConfidenceScore = topRiskObj ? (100 - topRiskObj.risk).toFixed(1) : "95.0";

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Brain className="w-7 h-7 text-primary" />
          ResistAI Analysis
        </h1>
        <p className="text-muted-foreground">Run AI-powered antibiotic resistance predictions using patient data</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Input Form - 2 columns */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="bg-card border-border rounded-2xl">
            <CardHeader>
              <CardTitle className="text-foreground">Prediction Input</CardTitle>
              <CardDescription>Enter clinical parameters to assess resistance risks</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="ltp" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-muted rounded-xl p-1">
                  <TabsTrigger value="ltp" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Clinical Data
                  </TabsTrigger>
                  <TabsTrigger value="mpa" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Multi-Pathogen
                  </TabsTrigger>
                  <TabsTrigger value="dr" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Drug Profiles
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="ltp" className="mt-6 space-y-6">
                  {/* Row 1: Demographics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-foreground">Age</Label>
                      <Input 
                        type="number"
                        placeholder="e.g. 64"
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        className="h-11 bg-muted border-border rounded-xl"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-foreground">Gender</Label>
                      <Select 
                        value={formData.gender} 
                        onValueChange={(val) => handleInputChange("gender", val)}
                      >
                        <SelectTrigger className="h-11 bg-muted border-border rounded-xl">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border rounded-xl">
                          <SelectItem value="1">Male</SelectItem>
                          <SelectItem value="0">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Row 2: Vitals & History Toggles */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border border-border rounded-xl bg-muted/30">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base font-medium">Diabetes</Label>
                        <p className="text-xs text-muted-foreground">Patient history of diabetes?</p>
                      </div>
                      <Switch 
                        checked={formData.diabetes} 
                        onCheckedChange={(val) => handleInputChange("diabetes", val)} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                      <div className="space-y-0.5">
                        <Label className="text-base font-medium">Hypertension</Label>
                        <p className="text-xs text-muted-foreground">Does patient have hypertension?</p>
                      </div>
                      <Switch 
                        checked={formData.hypertension} 
                        onCheckedChange={(val) => handleInputChange("hypertension", val)} 
                      />
                    </div>

                    <div className="flex items-center justify-between border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                      <div className="space-y-0.5">
                        <Label className="text-base font-medium">Kidney Infections</Label>
                        <p className="text-xs text-muted-foreground">History of kidney infections?</p>
                      </div>
                      <Switch 
                        checked={formData.kidneyInfections} 
                        onCheckedChange={(val) => handleInputChange("kidneyInfections", val)} 
                      />
                    </div>
                  </div>

                  {/* Row 3: Additional Details */}
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <Label className="text-foreground">Known Allergies</Label>
                      <Input 
                        placeholder="e.g. Penicillin, Sulfa drugs (leave blank if none)"
                        value={formData.allergies}
                        onChange={(e) => handleInputChange("allergies", e.target.value)}
                        className="h-11 bg-muted border-border rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Row 3: Infection & Hospital Context */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-foreground">Prior Hospitalization (Days)</Label>
                      <Input 
                        type="number"
                        placeholder="e.g. 14"
                        value={formData.hospital_before}
                        onChange={(e) => handleInputChange("hospital_before", e.target.value)}
                        className="h-11 bg-muted border-border rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-foreground">Infection Frequency</Label>
                      <Input 
                        type="number"
                        placeholder="e.g. 2"
                        value={formData.infection_freq}
                        onChange={(e) => handleInputChange("infection_freq", e.target.value)}
                        className="h-11 bg-muted border-border rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-foreground">Bacteria Identified</Label>
                      <Select 
                        value={formData.bacteria_name} 
                        onValueChange={(val) => handleInputChange("bacteria_name", val)}
                      >
                        <SelectTrigger className="h-11 bg-muted border-border rounded-xl">
                          <SelectValue placeholder="Select species" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border rounded-xl">
                          <SelectItem value="Escherichia coli">Escherichia coli</SelectItem>
                          <SelectItem value="Klebsiella pneumoniae">Klebsiella pneumoniae</SelectItem>
                          <SelectItem value="Pseudomonas aeruginosa">Pseudomonas aeruginosa</SelectItem>
                          <SelectItem value="Enterobacteria spp.">Enterobacteria spp.</SelectItem>
                          <SelectItem value="Proteus mirabilis">Proteus mirabilis</SelectItem>
                          <SelectItem value="Acinetobacter baumannii">Acinetobacter baumannii</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="mpa" className="mt-6">
                  <div className="text-center py-12 text-muted-foreground">
                    <Info className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Multi-Pathogen Analysis mode</p>
                    <p className="text-sm">Configure multiple pathogen inputs for comprehensive analysis</p>
                  </div>
                </TabsContent>

                <TabsContent value="dr" className="mt-6">
                  <div className="text-center py-12 text-muted-foreground">
                    <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Drug Resistance Profiling mode</p>
                    <p className="text-sm">Detailed resistance pattern analysis for specific drug classes</p>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Run Button */}
              <div className="mt-6 pt-6 border-t border-border">
                <Button 
                  onClick={handleRunPrediction}
                  disabled={isAnalyzing}
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-base font-medium transition-all duration-300"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Analyzing Sample...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Run AI Prediction
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Panel - 1 column */}
        <div className="space-y-6">
          {/* Results Card */}
          <Card className={`bg-card border-border rounded-2xl transition-all duration-500 ${showResults ? 'shadow-lg' : ''}`}>
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-green-500" />
                Prediction Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showResults && predictionResults ? (
                <div className="space-y-6 animate-in fade-in zoom-in duration-500">
                  {/* Recommended Antibiotic */}
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-500" />
                      <span className="text-sm font-medium text-green-600 dark:text-green-500">Fastest Resolution Path</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{predictionResults.top_drug}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Recommended Treatment</p>
                  </div>

                  {/* Resistance Probability */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-foreground">Resistance Probabilities Grid</h4>
                    
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
                      {predictionResults.all_results?.map((res: any, idx: number) => {
                        const isHigh = res.risk > 60;
                        const isMod = res.risk > 30;
                        
                        const colorClass = isHigh ? "bg-destructive" : isMod ? "bg-yellow-500" : "bg-green-500";
                        const badgeBg = isHigh ? "bg-destructive/10 text-destructive border-destructive/30" : 
                                        isMod ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/30" : 
                                        "bg-green-500/10 text-green-600 dark:text-green-500 border-green-500/30";

                        return (
                          <div key={idx} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-muted-foreground">{res.drug}</span>
                              <Badge className={badgeBg}>{res.risk}%</Badge>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${colorClass} rounded-full transition-all duration-1000 ease-out`} 
                                style={{ width: `${res.risk}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Confidence Score */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Efficacy Confidence Score</span>
                      <span className="text-lg font-bold text-primary">{highestConfidenceScore}%</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Brain className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>No analysis results yet</p>
                  <p className="text-sm mt-1">Fill in parameters and run prediction</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Warning Card */}
          {showResults && (
            <Card className="bg-card border-border rounded-2xl border-l-4 border-l-yellow-500 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Clinical Advisory</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Always map AI predictions with laboratory susceptibility testing. Models operate on stochastic boundaries.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  )
}
