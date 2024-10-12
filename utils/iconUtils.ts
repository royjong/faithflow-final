import { Headphones, Heart, Sun, Moon, CloudRain, Home, Leaf, Sword } from "lucide-react";

// Define the icon names as a union of specific string literals
type IconName = 'Headphones' | 'Heart' | 'Sun' | 'Moon' | 'CloudRain' | 'Home' | 'Leaf' | 'Sword';

// Map the icon names to their corresponding icons
const iconMap: Record<IconName, React.FC> = {
  Headphones,
  Heart,
  Sun,
  Moon,
  CloudRain,
  Home,
  Leaf,
  Sword
};

// Function to get the dynamic icon
export function getDynamicIcon(iconName: string) {
  // Typecast iconName to IconName to ensure it's one of the keys in iconMap
  if (iconName in iconMap) {
    return iconMap[iconName as IconName]; // Return the icon component if found
  }

  return Home; // Default to Home icon if not found
}
