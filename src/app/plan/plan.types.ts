export type Plan = {
  id: Number
  days: DaySelection[]
}

export type Day = {
  date: Date,
  lessons: Lesson[]
}

export type DaySelection = {
  id: Number,
  date: Date,
}

export type Lesson = {
  name: string
}
