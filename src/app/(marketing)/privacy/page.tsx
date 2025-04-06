import PageView from "@/components/views/Page"
import { Text } from "@/components/ui/text"
import { Separator } from "@/components/ui/separator"

const PrivacyPolicyPage = () => {
  return (
    <PageView title="Privacy policy">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <Text element="h3" className="font-medium text-lg" id="disclosure">
            Disclosure
          </Text>
          <Text element="p" as="mutedText" className="max-w-[64ch]">
            Include this disclosure in the syllabus of courses using Study
            Buddy.
          </Text>
        </div>
        <Separator className="max-w-[64ch]" />
        <div className="flex flex-col gap-4">
          <Text element="p" className="max-w-[64ch]">
            As part of this course, you will have the option to utilize Study
            Buddy, an application designed to facilitate student pairing for
            collaborative learning activities.
          </Text>
          <Text element="p" className="italic max-w-[64ch]">
            Your personal information, including your name, Student ID, and
            course grades, will be collected and used under the authority of
            section 26(c) of the British Columbia Freedom of Information and
            Protection of Privacy Act (FIPPA).
          </Text>
          <Text element="p" className="italic max-w-[64ch]">
            By agreeing to use Study Buddy, you authorize the application to
            access this information from Canvas solely for the purpose of
            matching you with compatible study partners. The information
            collected will not be used for any other purpose or shared with
            third parties external to the University.
          </Text>
          <Text element="p" className="italic max-w-[64ch]">
            Your participation in using Study Buddy is entirely voluntary. If
            you have any questions or concerns about the collection, use, or
            disclosure of your personal information, please contact Dr. Bowen
            Hui at bowen.hui[at]ubc[dot]ca.
          </Text>
        </div>
      </div>
    </PageView>
  )
}

export default PrivacyPolicyPage
