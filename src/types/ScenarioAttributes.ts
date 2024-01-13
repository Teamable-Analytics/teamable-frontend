/**
These values can be used for convenience when filling out the attributes field of a Student, but you
can theoretically use any values as long as there is consistency and clear documentation about what
each value means. You may also add more values into this file if it is a commonly used attribute.
 */

export enum ScenarioAttribute {
    GENDER = 1,
    GPA = 2,
    AGE = 3,
    RACE = 4,
    MAJOR = 5,
    YEAR_LEVEL = 6,
    TIMESLOT_AVAILABILITY = 7,
    LOCATION = 8,
}

export enum Gender {
    MALE = 1,
    FEMALE = 2,
    NON_BINARY = 3,
    OTHER = 4,
    NA = 5,
}

export enum Gpa {
    A = 1,
    B = 2,
    C = 3,
}

export enum Race {
    African = 1,
    European = 2,
    East_Asian = 3,
    South_Asian = 4,
    South_East_Asian = 5,
    First_Nations_or_Indigenous = 6,
    Hispanic_or_Latin_American = 7,
    Middle_Eastern = 8,
    Other = 9,
}
