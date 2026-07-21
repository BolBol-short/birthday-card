import art from '../../assets/11'

/**
 * The note. Layout is [ text | picture ].
 * ▼▼ Replace the title and paragraphs with your own words. ▼▼
 */
export default function Message() {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-[clamp(14px,2.4vw,28px)]
                    max-[900px]:grid-cols-1">
      <div>
        <h3 className="mb-2 text-[clamp(17px,2.2vw,24px)] font-extrabold text-hachi">
          Happy birthday, you fart smella
        </h3>
        <p className="mb-3 text-[clamp(13px,1.45vw,16px)] font-medium leading-[1.75] text-ink">
          Placeholder — write your own message here.
        </p>
        <p className="mb-3 text-[clamp(13px,1.45vw,16px)] font-medium leading-[1.75] text-ink">
          Say the thing you'd say out loud: the running joke, the day you both
          still bring up, the thing you're glad they do.
        </p>
        <p className="text-[clamp(13px,1.45vw,16px)] font-bold text-hachi">— from me</p>
      </div>

      <figure className="w-[clamp(112px,17vw,186px)] flex-none overflow-hidden rounded-2xl
                         border-[3px] border-hachi shadow-lg max-[900px]:hidden">
        <img src={art.field} alt="" className="h-auto w-full" />
      </figure>
    </div>
  )
}
