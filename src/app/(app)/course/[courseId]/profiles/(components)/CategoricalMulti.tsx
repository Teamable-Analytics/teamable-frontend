"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Form, Formik, useFormikContext } from "formik"
import { DragHandleDots2Icon, TrashIcon } from '@radix-ui/react-icons'

type Answer = {
  id: number;
  label: string;
};

const SortableInput = ({ index }: { index: number }) => {
  const { values, handleChange, setFieldValue } = useFormikContext<{
    question: string;
    answers: Answer[];
  }>()

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: values.answers[index].id })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div style={style} {...attributes}>
      <br></br>
      <Label>Answer {index + 1}</Label>
      <div className="grid grid-cols-10 gap-3">
        {values.answers.length > 1 ? (
          <>
            <Input
              className="col-span-8"
              name={`answers.${index}.label`}
              type="text"
              onChange={handleChange}
            />
            <Button
              type="button"
              className="col-span-1"
              onClick={() =>
                setFieldValue("answers",
                  values.answers.filter((_, i: number) => i !== index),)
              }
            >
              <TrashIcon />
            </Button>
            <button
              type="button"
              className="col-span-1 content-center"
              ref={setNodeRef}
              {...listeners}
            >
              <DragHandleDots2Icon />
            </button>
          </>
        ) : (
          <Input
            className="col-span-10"
            name={`answers.${index}.label`}
            type="text"
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  )
}

const CategoricalMultiEditor = () => {
  const { values, setFieldValue, handleChange } = useFormikContext<{
    question: string;
    answers: Answer[];
  }>()

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id === over.id) {
      return
    }

    const oldIndex = values.answers.findIndex((answer) => answer.id === active.id,)
    const newIndex = over
      ? values.answers.findIndex((answer) => answer.id === over.id)
      : -1

    setFieldValue("answers", arrayMove(values.answers, oldIndex, newIndex))
  }

  return (
    <Card>
      <Form>
        <CardHeader>
          <CardTitle>Multiple Choice Question</CardTitle>
          <CardDescription>
            Order of the answers is tiered and the top one is considered
            higher/better
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label>Question Text</Label>
          <Input
            name="question"
            type="text"
            onChange={handleChange}
            placeholder="Question Text"
          />
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext
              items={values.answers}
              strategy={verticalListSortingStrategy}
            >
              {values.answers.map((answer, index) => (
                <SortableInput key={answer.id} index={index} />
              ))}
            </SortableContext>
          </DndContext>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            onClick={() => {
              setFieldValue(`answers.${values.answers.length}`, {
                id: Math.max(...values.answers.map((answer) => answer.id)) + 1,
                label: "",
              })
            }}
          >
            Add Answer
          </Button>
          <Button type="submit">Save Question</Button>
        </CardFooter>
      </Form>
    </Card>
  )
}

const CategoricalMultiPreview = () => {
  const { values } = useFormikContext<{
    question: string;
    answers: Answer[];
  }>()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{values.question}</CardTitle>
      </CardHeader>
      {values.answers.map((answer, index) => (
        <CardContent key={index}>
          <div className="flex items-center space-x-2">
            <Checkbox value={"" + answer.id} />
            <Label>{answer.label}</Label>
          </div>
        </CardContent>
      ))}
    </Card>
  )
}

const CategoricalMulti = () => {
  const INITIAL_QUESTION: string = ""
  const INITIAL_ANSWERS: Answer[] = [{ id: 1, label: "" }]
  const INITIAL_VALUES = {
    question: INITIAL_QUESTION,
    answers: INITIAL_ANSWERS,
  }

  return (
    <div className="container mx-auto">
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <div className="grid grid-cols-2 gap-3">
          <CategoricalMultiEditor />
          <CategoricalMultiPreview />
        </div>
      </Formik>
    </div>
  )
}

export default CategoricalMulti
