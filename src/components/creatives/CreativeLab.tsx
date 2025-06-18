
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Palette, Sparkles, Image, Type } from "lucide-react";
import { useState } from "react";

export const CreativeLab = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("modern");

  const creativeVariants = [
    {
      id: 1,
      type: "Carousel",
      score: 92,
      description: "Lifestyle photography with product focus",
      expectedCTR: "2.8%",
      confidence: 89
    },
    {
      id: 2,
      type: "Video",
      score: 88,
      description: "15s product demonstration",
      expectedCTR: "3.2%",
      confidence: 84
    },
    {
      id: 3,
      type: "Static",
      score: 76,
      description: "Bold typography with brand colors",
      expectedCTR: "1.9%",
      confidence: 91
    }
  ];

  const styles = ['modern', 'minimal', 'bold', 'elegant', 'playful'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-purple-600" />
          Creative Lab
        </CardTitle>
        <CardDescription>
          AI-powered creative generation and optimization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="creative-prompt">Describe your product/service</Label>
              <Textarea
                id="creative-prompt"
                placeholder="Summer collection of sustainable fashion for young professionals..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Creative Style</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {styles.map((s) => (
                  <Badge
                    key={s}
                    variant={style === s ? "default" : "outline"}
                    className="cursor-pointer capitalize"
                    onClick={() => setStyle(s)}
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            <Button className="w-full">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Creative Variants
            </Button>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <Image className="w-4 h-4" />
              AI-Generated Variants
            </h4>
            
            {creativeVariants.map((variant) => (
              <div key={variant.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-sm">{variant.type}</span>
                    <Badge variant="secondary" className="text-xs">
                      Score: {variant.score}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    Generate
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-2">{variant.description}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Expected CTR: {variant.expectedCTR}</span>
                  <span>{variant.confidence}% confidence</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="font-medium text-sm">AI Creative Insights</span>
          </div>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Video formats show 45% higher engagement for your industry</li>
            <li>• Lifestyle imagery performs 23% better than product shots</li>
            <li>• Optimal aspect ratio: 4:5 for feed, 9:16 for stories</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
