import { HandWrittenTitle } from "@/components/ui/hand-writing-text"
import { GlowingInput } from "@/components/ui/glowing-input"

function HandWrittenTitleDemo() {
    return <HandWrittenTitle title="Kokonut UI" subtitle="Optional subtitle" />
}

function GlowingInputDemo() {
    return (
        <div className="w-full">
            <GlowingInput />
        </div>
    )
}

export { HandWrittenTitleDemo, GlowingInputDemo }
