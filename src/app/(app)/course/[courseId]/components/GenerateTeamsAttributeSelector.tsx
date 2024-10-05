import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { GradeSourceAttributeSelector } from "@/components/GradeSourceAttributeSelector"
import { Button } from "@/components/ui/button"

export const GenerateTeamsAttributeSelector = ({
  open,
  setOpen,
  isPending,
  onSubmit,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  isPending: boolean;
  onSubmit: (args: { attribute: number }) => Promise<void>;
}) => {
  const [selectedGradeAttribute, setSelectedGradeAttribute] = useState<
    { id: number; name: string } | undefined
  >()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a grade source</DialogTitle>
          <DialogDescription>
            Please select a grade attribute to use for team generation.
          </DialogDescription>
        </DialogHeader>
        <GradeSourceAttributeSelector
          onSelect={async ({ gradeAttribute }) => {
            setSelectedGradeAttribute(gradeAttribute)
          }}
        />
        <DialogFooter>
          <Button
            type="submit"
            disabled={!selectedGradeAttribute}
            loading={isPending}
            onClick={async () => {
              if (!selectedGradeAttribute) return
              await onSubmit({ attribute: selectedGradeAttribute.id })
              setOpen(false)
            }}
          >
            Generate teams
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
