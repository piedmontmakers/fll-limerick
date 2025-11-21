import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { awards } from '../data/awards';

export function LimerickGenerator() {
  const [selectedAward, setSelectedAward] = useState('');
  const [teamName, setTeamName] = useState('');
  const [judgeDetails, setJudgeDetails] = useState('');
  const [limericks, setLimericks] = useState<string[]>([]);
  const [selectedLimerick, setSelectedLimerick] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!selectedAward || !teamName) {
      alert('Please select an award and enter a team name');
      return;
    }

    setIsGenerating(true);
    setSelectedLimerick(null);
    setError(null);

    try {
      const award = awards.find(a => a.id === selectedAward);
      const generatedLimericks = await generateLimericks(award?.name || '', award?.description || '', teamName, judgeDetails);
      setLimericks(generatedLimericks);
    } catch (err) {
      console.error('Error generating limericks:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate limericks. Please try again.');
      setLimericks([]);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateLimericks = async (
    awardName: string,
    awardDescription: string,
    team: string,
    details: string
  ): Promise<string[]> => {
    const apiKey = import.meta.env.VITE_AI_GATEWAY_API_KEY;

    if (!apiKey) {
      throw new Error('AI Gateway API key not configured');
    }

    const prompt = `You are a creative poet writing celebratory limericks for FIRST LEGO League award ceremonies.

Award: ${awardName}
Award Description: ${awardDescription}
Team Name: ${team}
${details ? `Additional Details: ${details}` : ''}

Generate exactly 3 different celebratory limericks for this team receiving this award. Each limerick should:
1. Follow the AABBA rhyme scheme
2. Be uplifting and celebratory
3. Reference the award (you may use individual words from the team name if they fit naturally, but do NOT include the complete team name as-is)
4. Be appropriate for young students (ages 9-14)
5. Capture the spirit of the award and what makes this team special

Return ONLY the 3 limericks, with each limerick separated by a blank line. Do not include any other text, numbering, explanations, or "---" markers.`;

    const response = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a creative poet specializing in celebratory limericks for FIRST LEGO League competitions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.9,
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || 'Failed to generate limericks');
    }

    // Get raw response text for debugging
    const rawText = await response.text();
    console.log('Raw Response:', rawText);

    const data = JSON.parse(rawText);
    console.log('API Response:', data);
    console.log('Reasoning Details:', data.choices?.[0]?.message?.reasoning_details);

    // Check if content is in reasoning_details
    const reasoningDetails = data.choices?.[0]?.message?.reasoning_details;
    let responseText = data.choices[0]?.message?.content || '';

    // If content is empty but reasoning_details exists, try to get content from there
    if (!responseText && reasoningDetails && reasoningDetails.length > 0) {
      console.log('Trying to extract from reasoning_details:', reasoningDetails[0]);
      responseText = reasoningDetails[0]?.content || '';
    }

    console.log('Response Text:', responseText);

    // Remove any trailing "---" markers
    const cleanedText = responseText.replace(/---+\s*$/g, '').trim();

    // Split by double newlines (paragraph breaks) to separate limericks
    const limericks = cleanedText
      .split(/\n\s*\n/)
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.match(/^---+$/));

    console.log('Parsed Limericks:', limericks);

    if (limericks.length === 0) {
      throw new Error('No limericks were generated');
    }

    return limericks;
  };

  const generateMockLimericks = (awardName: string, team: string) => {
    // Fallback limericks when API is unavailable
    return [
      `Team ${team} with skills so bright,
Their ${awardName.toLowerCase()} shines in the light,
With robots that soar,
They always score more,
Their future looks wonderfully bright!`,

      `In the challenge they found their way,
${team} improved every day,
With ${awardName.toLowerCase()} earned,
From all that they learned,
Their excellence here is on display!`,

      `The judges have chosen with care,
${team}'s talent beyond compare,
For ${awardName.toLowerCase()} they're crowned,
Their brilliance profound,
A team that shows how much they care!`
    ];
  };

  const selectedAwardData = awards.find(a => a.id === selectedAward);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Award Information</CardTitle>
          <CardDescription>
            Select an award and provide team details to generate celebratory limericks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="award">Award</Label>
            <Select value={selectedAward} onValueChange={setSelectedAward}>
              <SelectTrigger id="award">
                <SelectValue placeholder="Select an award" />
              </SelectTrigger>
              <SelectContent>
                <div className="px-2 py-1.5 font-semibold text-sm text-gray-500">
                  Required Awards
                </div>
                {awards
                  .filter(a => a.category === 'required')
                  .map(award => (
                    <SelectItem key={award.id} value={award.id}>
                      {award.name}
                    </SelectItem>
                  ))}

                <div className="px-2 py-1.5 font-semibold text-sm text-gray-500 mt-2">
                  Optional Awards
                </div>
                {awards
                  .filter(a => a.category === 'optional')
                  .map(award => (
                    <SelectItem key={award.id} value={award.id}>
                      {award.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            {selectedAwardData && (
              <div className="mt-3 p-4 rounded-lg border" style={{ backgroundColor: '#FEF5F0', borderColor: '#F5D5C3' }}>
                <p className="text-sm" style={{ color: '#5A4A42' }}>{selectedAwardData.description}</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="teamName">Team Name</Label>
            <Input
              id="teamName"
              placeholder="Enter team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="judgeDetails">Additional Details from Judges</Label>
            <Textarea
              id="judgeDetails"
              placeholder="Enter any special notes or highlights about the team..."
              value={judgeDetails}
              onChange={(e) => setJudgeDetails(e.target.value)}
              rows={4}
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !selectedAward || !teamName}
            className="w-full"
            style={{ backgroundColor: '#F26A21' }}
          >
            {isGenerating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            {isGenerating ? 'Generating Limericks...' : 'Generate Limericks'}
          </Button>

          {error && (
            <div className="mt-4 p-4 rounded-lg border" style={{ backgroundColor: '#FEF2F2', borderColor: '#FCA5A5' }}>
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 flex-shrink-0" style={{ color: '#DC2626' }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: '#DC2626' }}>
                    {error}
                  </p>
                  <p className="text-xs mt-1" style={{ color: '#991B1B' }}>
                    Please check the console for more details or verify your API key is configured correctly.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {limericks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Limericks</CardTitle>
            <CardDescription>
              Choose your favorite limerick for the award presentation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {limericks.map((limerick, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border-2 cursor-pointer transition-all"
                style={{
                  borderColor: selectedLimerick === index ? '#F26A21' : '#E5D5C3',
                  backgroundColor: selectedLimerick === index ? '#FEF5F0' : '#FFFFFF'
                }}
                onClick={() => setSelectedLimerick(index)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Option {index + 1}</Badge>
                      {selectedLimerick === index && (
                        <CheckCircle2 className="h-4 w-4" style={{ color: '#F26A21' }} />
                      )}
                    </div>
                    <p className="whitespace-pre-line italic" style={{ color: '#5A4A42' }}>
                      {limerick}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {selectedLimerick !== null && (
              <div className="mt-4 p-4 rounded-lg border" style={{ backgroundColor: '#E8F5E9', borderColor: '#81C784' }}>
                <p className="text-sm" style={{ color: '#2E7D32' }}>
                  ✓ Limerick {selectedLimerick + 1} selected! Ready to present.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
