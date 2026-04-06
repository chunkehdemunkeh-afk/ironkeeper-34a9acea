import { Icon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { soccerBall } from "@lucide/lab";
import { forwardRef, createElement } from "react";

const SoccerBall = forwardRef<SVGSVGElement, any>((props, ref) => (
  <Icon ref={ref} iconNode={soccerBall} {...props} />
)) as unknown as LucideIcon;
SoccerBall.displayName = "SoccerBall";

export { SoccerBall };
