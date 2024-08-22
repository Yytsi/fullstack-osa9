export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartDescription {
  description: string;
}

export interface CoursePartBasic extends CoursePartDescription, CoursePartBase {
  kind: 'basic';
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

export interface CoursePartBackground
  extends CoursePartDescription,
    CoursePartBase {
  backgroundMaterial: string;
  kind: 'background';
}

export interface CoursePartSpecial
  extends CoursePartDescription,
    CoursePartBase {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
