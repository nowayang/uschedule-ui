export type Plan = {
  id: number
  days: DaySelection[]
}

export type Day = {
  id: number,
  date: Date,
  lessons: Lesson[]
}

export type DaySelection = {
  id: number,
  date: Date,
  lessonsLength: number
}

export type Lesson = {
  name: string,
  color: string,
  start: Date,
  end: Date,
}

export type Settings = {
  degree: number,
  year: number,
  group: number
}
