import art from '../../assets/11'

/**
 * The note. [ text | picture ] on roomy screens; stacks on small ones.
 * The window body scrolls, so a long message is fine.
 *
 * ▼▼ Replace the title and paragraphs with your own words. ▼▼
 */
export default function Message() {
  const para = 'mb-3 text-[clamp(12px,2vh,16px)] font-medium leading-[1.7] text-ink'

  return (
    <div className="flex flex-col-reverse items-center gap-4
                    min-[680px]:grid min-[680px]:grid-cols-[1fr_auto]
                    min-[680px]:items-center min-[680px]:gap-[clamp(14px,2.4vw,28px)]">
      <div className="min-w-0">
        <h3 className="mb-2 text-[clamp(15px,3vh,24px)] font-extrabold text-hachi">
          Happy birthday, you fart smella
        </h3>
        <p className={para}>
          Unc fart smella, you just turned 15 years old! Damm you old asf. 👵
        </p>
        <p className={para}>
          Anyways, Happy birthday to ya. Mom and Dad are proud of ya
          always love ya. No matter what happens, mom and dad, and I will love, you fart smella.
          Stay strong and wish ya a good day fr, fr. 🔥🔥🔥
        </p>
        <p className={para}>
          Also, wishes ya a good time, good day, good month, and good year. 
          Wish ya do great in highschool and get rich, you fart smella! 🤑

          Note: Sorry, if this is lackluster. Since I have to prepared fast, you stinky fart.
        </p>
        <p className="text-[clamp(12px,2vh,16px)] font-bold text-hachi">— from your favorite, fat little chud</p>
      </div>

      <figure className="w-[clamp(88px,18vh,186px)] shrink-0 overflow-hidden rounded-2xl
                         border-[3px] border-hachi shadow-lg">
        <img src={art.field} alt="" className="h-auto w-full" />
      </figure>
    </div>
  )
}
