import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    // Clone children to add the correct variant and size props
    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement<React.ComponentPropsWithoutRef<typeof Button>>(child) && child.type === Button) {
        return React.cloneElement(child, {
          variant: child.props.variant || variant,
          size: child.props.size || size,
          className: cn(
            child.props.className,
            "rounded-none first:rounded-l-md last:rounded-r-md border-r-[1px] border-r-primary-foreground/10 last:border-r-0",
            child.props.variant === "outline" && "border-r-input"
          ),
        });
      }
      return child;
    });

    return (
      <div ref={ref} className={cn("inline-flex", className)} role="group" {...props}>
        {childrenWithProps}
      </div>
    );
  }
);
ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };