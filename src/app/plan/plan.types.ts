export type Plan = {
  id: number,
  fileName: string,
  fileModifiedAt: Date,
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
  enableNotification: boolean,
  degree: number,
  level: number,
  groupIndex: number
}
