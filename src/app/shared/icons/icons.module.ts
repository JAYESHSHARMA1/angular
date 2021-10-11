import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import {
  Camera,
  Heart,
  Github,
  MessageSquare,
  Home,
  Hexagon,
  Bell,
  Calendar,
  Compass,
  PlusCircle,
  AlertCircle,
  MessageCircle,
  Share2,
  Bookmark,
  MoreVertical,
} from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  Camera,
  Heart,
  Github,
  MessageSquare,
  Home,
  Hexagon,
  Bell,
  Calendar,
  Compass,
  PlusCircle,
  AlertCircle,
  MessageCircle,
  Share2,
  Bookmark,
  MoreVertical,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}

// NOTES:
// 1. We add FeatherModule to the 'exports', since the <i-feather> component will be used in templates of parent module
// 2. Don't forget to pick some icons using FeatherModule.pick({ ... })
