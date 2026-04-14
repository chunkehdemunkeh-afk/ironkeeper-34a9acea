import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Sparkles, Check } from "lucide-react";
import { ChangelogEntry } from "@/lib/changelog";

interface Props {
  open: boolean;
  onClose: () => void;
  entry: ChangelogEntry;
}

export default function WhatsNewSheet({ open, onClose, entry }: Props) {
  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="rounded-t-2xl max-h-[85vh] overflow-y-auto pb-8">
        <SheetHeader className="text-left pb-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-base">What's New</SheetTitle>
              <p className="text-xs text-muted-foreground">
                v{entry.version} · {entry.date}
              </p>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-1.5 mb-6">
          <h3 className="text-sm font-semibold">{entry.title}</h3>
          <ul className="space-y-2">
            {entry.changes.map((change, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{change}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button onClick={onClose} className="w-full h-11">
          Got it!
        </Button>
      </SheetContent>
    </Sheet>
  );
}
