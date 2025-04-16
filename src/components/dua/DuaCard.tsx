import Image from "next/image";
import React from "react";
import { ActionButtons } from "./ActionButtons";

interface DuaCardProps {
  number: number;
  title: string;
  content: string;
  arabicText?: string;
  transliteration?: string;
  translation?: string;
  reference: string;
  audio?: string;
}

export const DuaCard: React.FC<DuaCardProps> = ({
  number,
  title,
  content,
  arabicText,
  transliteration,
  translation,
  reference,
  audio,
}) => {
  return (
    <div className="bg-white border w-full mt-2.5 px-[30px] py-[15px] rounded-[10px] border-[rgba(226,226,226,1)] border-solid">
      <div className="flex w-full flex-col items-stretch text-base text-[rgba(57,57,57,1)] font-normal leading-6 justify-center">
        <div className="flex w-full items-center gap-2.5 text-[rgba(31,164,91,1)] font-semibold leading-loose flex-wrap">
          <Image
          alt={title}
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b76a742135230c3749b92e44761c6dc79aba353a?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-[35px] self-stretch shrink-0 my-auto"
            width={35}
            height={35}
          />
          <div className="self-stretch my-auto">
            {number}. {title}
          </div>
        </div>

        <div className="mt-7">{content}</div>

        {arabicText && (
          <div className="text-2xl font-normal leading-[71px] text-right mt-7">
            {arabicText}
          </div>
        )}

        {(transliteration || translation) && (
          <div className="flex w-full flex-col items-stretch leading-[25px] justify-center mt-7">
            {transliteration && (
              <div className="font-bold">
                <span className="font-semibold">Transliteration: </span>
                <span className="font-normal italic">{transliteration}</span>
              </div>
            )}

            {translation && (
              <div className="font-normal mt-2.5">
                <span className="font-semibold">Translation: </span>
                {translation}
              </div>
            )}
          </div>
        )}

        <div className="font-normal leading-6 mt-7">
          <span className="font-semibold text-[rgba(31,164,91,1)]">
            Reference:
          </span>
          <br />
          <span className="font-medium">{reference}</span>
        </div>
      </div>

      <div className="flex w-full items-center justify-end mt-7 pb-2.5">
        <ActionButtons />
      </div>
    </div>
  );
};
