'use client'

import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable"
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Formik, Form, Field, FieldArray, FieldArrayRenderProps, FormikErrors } from 'formik'

type Answer = {
    id: number
    label: string
}

const SortableInput = ({answer, index, answers, setAnswers, arrayHelpers, setFieldValue}: {answer: Answer, index: number, answers: Answer[], setAnswers: Dispatch<SetStateAction<Answer[]>>, arrayHelpers: FieldArrayRenderProps, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<{question: string; answers: string[];}>>}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: answer.id})

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <div key={index} style={style} {...attributes}>
            <br></br>
            <Label>Answer {index + 1}</Label>
            <div className="grid grid-cols-10 gap-3">
                { answers.length > 1 ?
                    <>
                        <div className="col-span-8">
                            <Field name={`answers.${index}`} type="text" placeholder="" value={answer.label} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e: any) => {
                                answer.label = e.target.value
                                setAnswers(answers.map(el => {
                                    return el.id === answer.id ? answer : el
                                }))
                                setFieldValue(`answers.${index}`, e.target.value)
                            }} />
                        </div>
                        <Button className="col-span-1" onClick={() => {
                            setAnswers(answers.filter(el => {
                                return el.id !== answer.id
                            }))
                            arrayHelpers.remove(index)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 8 8"><path fill="currentColor" d="M3 0c-.55 0-1 .45-1 1H1c-.55 0-1 .45-1 1h7c0-.55-.45-1-1-1H5c0-.55-.45-1-1-1zM1 3v4.81c0 .11.08.19.19.19h4.63c.11 0 .19-.08.19-.19V3h-1v3.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5V3h-1v3.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5V3h-1z"/></svg>
                        </Button>
                        <button type="button" className="col-span-1 content-center" ref={setNodeRef} {...listeners}>
                            <svg className="icon icon-tabler icon-tabler-grip-vertical" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <circle cx="9" cy="5" r="1" />
                                <circle cx="9" cy="12" r="1" />
                                <circle cx="9" cy="19" r="1" />
                                <circle cx="15" cy="5" r="1" />
                                <circle cx="15" cy="12" r="1" />
                                <circle cx="15" cy="19" r="1" />
                            </svg>
                        </button>
                    </>
                    :
                    <>
                        <div className="col-span-10">
                            <Field name={`answers.${index}`} type="text" placeholder="" value={answer.label} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e: any) => {
                                answer.label = e.target.value
                                setAnswers(answers.map(el => {
                                    return el.id === answer.id ? answer : el
                                }))
                                setFieldValue(`answers.${index}`, e.target.value)
                            }} />
                        </div>
                    </>
                }
            </div>
        </div>
    )
}


const MultipleChoiceEditor = () => {
    const ArrayHelperRef = useRef<FieldArrayRenderProps>()
    const [questionText, setQuestionText] = useState('What is your favorite color?')
    const [answers, setAnswers] = useState<Answer[]>([{id: 1, label: ''}])

    const onDragEnd = (event: DragEndEvent) => {
        const {active, over} = event
        if (over && active.id === over.id) {
            return
        }

        const oldIndex = answers.findIndex((answer) => answer.id === active.id)
        const newIndex = over ? answers.findIndex((answer) => answer.id === over.id) : -1

        if (ArrayHelperRef.current) {
            ArrayHelperRef.current.move(oldIndex, newIndex)
        }

        setAnswers((answers) => {
            return arrayMove(answers, oldIndex, newIndex)
        })
    }

    return (
        <>
            <div className="container mx-auto">

                {/* EDITOR */}
                <div className="grid grid-cols-2 gap-3">
                    <Card>
                        <Formik
                            initialValues={{ question: "What is your favorite color?", answers: [""] }}
                            onSubmit={(values) => {
                                alert(JSON.stringify(values, null, 2))
                            }}
                        >
                            {({
                                setFieldValue,
                            }) => (
                                <Form>
                                    <CardHeader>
                                        <CardTitle>Multiple Choice Question</CardTitle>
                                        <CardDescription>Order of the answers is tiered and the top one is considered higher/better</CardDescription>
                                    </CardHeader>
                                    <CardContent>

                                        <Label>Question Text</Label>
                                        <Field name="question" type="text" placeholder="" value={questionText} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e: any) => {
                                            setQuestionText(e.target.value)
                                            setFieldValue(e.target.name, e.target.value)
                                        }} />

                                        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                                            <FieldArray
                                                name="answers"
                                                render={arrayHelpers => {
                                                    ArrayHelperRef.current = arrayHelpers
                                                    return (
                                                        <SortableContext items={answers} strategy={verticalListSortingStrategy}>
                                                            {answers.map((answer, index) => (
                                                                <SortableInput key={answer.id} answer={answer} index={index} answers={answers} setAnswers={setAnswers} arrayHelpers={arrayHelpers} setFieldValue={setFieldValue} />
                                                            ))}
                                                        </SortableContext>
                                                    )
                                                }}>
                                            </FieldArray>
                                        </DndContext>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button type="button" onClick={() => {
                                            setAnswers([...answers, {id: answers.length + 1, label: ''}])
                                            ArrayHelperRef.current?.push('')
                                        }}>Add Answer</Button>
                                        <Button type="submit" onClick={() => {
                                        }}>Save Question</Button>
                                    </CardFooter>
                                </Form>
                            )}
                        </Formik>
                    </Card>

                    {/* VIEWER */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{questionText}</CardTitle>
                        </CardHeader>
                        <RadioGroup>
                            {answers.map((answer, index) => (
                                <CardContent key={index}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={'' + answer.id} id={'' + answer.id} />
                                        <Label htmlFor={'' + answer.id}>{answer.label}</Label>
                                    </div>
                                </CardContent>
                            ))}
                        </RadioGroup>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default MultipleChoiceEditor
