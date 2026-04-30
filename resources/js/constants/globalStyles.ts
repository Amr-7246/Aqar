export const typography = {
  heading: 'text-2xl font-bold text-foreground',
  subheading: 'text-xl font-semibold text-foreground',
  body: 'text-base text-foreground',
  bodySmall: 'text-sm text-foreground',
  caption: 'text-xs text-muted-foreground',
  label: 'text-sm font-medium text-foreground',
};

export const spacing = {
  container: 'px-4 py-6 md:px-6 lg:px-8',
  section: 'mb-6',
  element: 'mb-4',
};

export const borders = {
  card: 'border border-border rounded-lg',
  input: 'border border-input rounded-md',
  focus: 'focus:ring-2 focus:ring-ring focus:border-ring',
};

export const buttons = {
  base: 'px-4 py-2 rounded-md transition-colors duration-200 font-medium',
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  icon: 'p-2 rounded-md hover:bg-accent transition-colors',
};
export const page = 'p-[40px]'
