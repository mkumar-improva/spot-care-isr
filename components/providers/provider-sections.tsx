import type { ProviderDetail } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type ProviderSectionsProps = {
  provider: ProviderDetail;
};

export function ProviderSections({ provider }: ProviderSectionsProps) {
  const sections = provider.sections ?? [];

  if (!sections.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">Care Details</CardTitle>
        <CardDescription>Structured responses supplied by the provider for transparency.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="space-y-4 rounded-xl border border-border/80 bg-muted/30 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-foreground">{section.name ?? 'Untitled section'}</h3>
                {section.group ? <p className="text-xs text-muted-foreground">{section.group}</p> : null}
              </div>
              <div className="flex flex-wrap gap-2">
                {section.careType ? <Badge variant="secondary">{section.careType}</Badge> : null}
              </div>
            </div>

            {section.subSections?.length ? (
              <div className="space-y-4">
                {section.subSections.map((subSection) => (
                  <div
                    key={subSection.id}
                    className="space-y-4 rounded-lg border border-dashed border-border/70 bg-background/70 p-4"
                  >
                    {subSection.name ? (
                      <h4 className="text-sm font-semibold text-foreground">{subSection.name}</h4>
                    ) : null}
                    <div className="space-y-4">
                      {subSection.questions.length ? (
                        subSection.questions.map((question) => (
                          <div key={question.id} className="space-y-2">
                            {question.text ? (
                              <p className="text-sm font-medium text-foreground">{question.text}</p>
                            ) : null}
                            {question.responses.length ? (
                              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                                {question.responses.map((response, index) => (
                                  <li key={`${question.id}-${index}`}>{response}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-muted-foreground">No responses provided.</p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No questions recorded.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No additional details provided.</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
