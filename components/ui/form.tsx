"use client"

import * as React from "react"
import type * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"


const Fomr = FormProvider

type FormFieldContextValue < 
    TFieldVaulues extends FieldValues = FieldValues,
    TName extends FieldPath< TFieldVaulues> = FieldPath<TFieldPath<TFieldValues>,
    > = {
        name = TName
    }