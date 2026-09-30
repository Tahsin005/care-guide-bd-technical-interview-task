import { useId } from 'react';

export function NotefulIcon({ className = 'w-16 h-16', ...props }) {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  return (
    <svg
      viewBox="0 0 170 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id={`${id}-g_R_outer`} x1="157" y1="22" x2="157" y2="166" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ebe6d3" />
          <stop offset="100%" stopColor="#8e865f" />
        </linearGradient>
        <linearGradient id={`${id}-gR_01`} x1="157" y1="22" x2="153" y2="157" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#dfd9c1" />
          <stop offset="100%" stopColor="#928a64" />
        </linearGradient>
        <linearGradient id={`${id}-gR_12`} x1="103" y1="10" x2="153" y2="157" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fdfbf3" />
          <stop offset="40%" stopColor="#e4ded0" />
          <stop offset="100%" stopColor="#b4ac91" />
        </linearGradient>
        <linearGradient id={`${id}-gR_23`} x1="103" y1="10" x2="115" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b835e" />
          <stop offset="100%" stopColor="#554d32" />
        </linearGradient>
        <linearGradient id={`${id}-gR_34`} x1="54" y1="13" x2="153" y2="157" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fdfbf3" />
          <stop offset="45%" stopColor="#e6dfce" />
          <stop offset="100%" stopColor="#b8af94" />
        </linearGradient>
        <linearGradient id={`${id}-gR_45`} x1="54" y1="13" x2="85" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#787050" />
          <stop offset="100%" stopColor="#38321e" />
        </linearGradient>

        <linearGradient id={`${id}-g_L_outer`} x1="13" y1="166" x2="13" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ebe6d3" />
          <stop offset="100%" stopColor="#8e865f" />
        </linearGradient>
        <linearGradient id={`${id}-gL_01`} x1="13" y1="166" x2="17" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#dfd9c1" />
          <stop offset="100%" stopColor="#928a64" />
        </linearGradient>
        <linearGradient id={`${id}-gL_12`} x1="66" y1="177" x2="17" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fdfbf3" />
          <stop offset="40%" stopColor="#e4ded0" />
          <stop offset="100%" stopColor="#b4ac91" />
        </linearGradient>
        <linearGradient id={`${id}-gL_23`} x1="66" y1="177" x2="55" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b835e" />
          <stop offset="100%" stopColor="#554d32" />
        </linearGradient>
        <linearGradient id={`${id}-gL_34`} x1="115" y1="174" x2="17" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fdfbf3" />
          <stop offset="45%" stopColor="#e6dfce" />
          <stop offset="100%" stopColor="#b8af94" />
        </linearGradient>
        <linearGradient id={`${id}-gL_45`} x1="115" y1="174" x2="85" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#787050" />
          <stop offset="100%" stopColor="#38321e" />
        </linearGradient>

        <linearGradient id={`${id}-g_diag_ribbon`} x1="17" y1="30" x2="153" y2="157" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f8f4e6" />
          <stop offset="100%" stopColor="#ded7c2" />
        </linearGradient>
      </defs>

      <g>
        <polygon points="13,21 17,30 13,166" fill={`url(#${id}-g_L_outer)`} />
        <polygon points="157,166 153,157 157,22" fill={`url(#${id}-g_R_outer)`} />

        <polygon points="153,157 157,22 122,52" fill={`url(#${id}-gR_01)`} />
        <polygon points="153,157 122,52 103,10" fill={`url(#${id}-gR_12)`} />
        <polygon points="153,157 103,10 90,58" fill={`url(#${id}-gR_23)`} />
        <polygon points="153,157 90,58 54,13" fill={`url(#${id}-gR_34)`} />
        <polygon points="153,157 54,13 17,30" fill={`url(#${id}-gR_45)`} />

        <polygon points="17,30 13,166 47,135" fill={`url(#${id}-gL_01)`} />
        <polygon points="17,30 47,135 66,177" fill={`url(#${id}-gL_12)`} />
        <polygon points="17,30 66,177 79,129" fill={`url(#${id}-gL_23)`} />
        <polygon points="17,30 79,129 115,174" fill={`url(#${id}-gL_34)`} />
        <polygon points="17,30 115,174 153,157" fill={`url(#${id}-gL_45)`} />

        <polygon points="17,30 153,157 149,158 15,34" fill={`url(#${id}-g_diag_ribbon)`} />

        <line x1="153" y1="157" x2="157" y2="22" stroke="#fffdf6" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <line x1="153" y1="157" x2="103" y2="10" stroke="#fffdf6" strokeWidth="2.2" strokeLinecap="round" opacity="0.95" />
        <line x1="153" y1="157" x2="54" y2="13" stroke="#fffdf6" strokeWidth="2.2" strokeLinecap="round" opacity="0.95" />

        <line x1="17" y1="30" x2="13" y2="166" stroke="#fffdf6" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <line x1="17" y1="30" x2="66" y2="177" stroke="#fffdf6" strokeWidth="2.2" strokeLinecap="round" opacity="0.95" />
        <line x1="17" y1="30" x2="115" y2="174" stroke="#fffdf6" strokeWidth="2.2" strokeLinecap="round" opacity="0.95" />

        <line x1="17" y1="30" x2="153" y2="157" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" opacity="1" />
        <line x1="13" y1="21" x2="13" y2="166" stroke="#fffdf6" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <line x1="157" y1="22" x2="157" y2="166" stroke="#fffdf6" strokeWidth="2" strokeLinecap="round" opacity="0.9" />

        <circle cx="54" cy="13" r="1.8" fill="#fffdf6" />
        <circle cx="103" cy="10" r="1.8" fill="#fffdf6" />
        <circle cx="157" cy="22" r="1.6" fill="#fffdf6" />
        <circle cx="13" cy="21" r="1.6" fill="#fffdf6" />
        <circle cx="66" cy="177" r="1.8" fill="#fffdf6" />
        <circle cx="115" cy="174" r="1.8" fill="#fffdf6" />
        <circle cx="13" cy="166" r="1.6" fill="#fffdf6" />
        <circle cx="157" cy="166" r="1.6" fill="#fffdf6" />
      </g>
    </svg>
  );
}

export function NotefulLogo({
  className = 'w-72 sm:w-96 md:w-[460px] h-auto',
  variant = 'light',
  ...props
}) {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const textColor = variant === 'dark' ? '#ffffff' : '#1e293b';

  return (
    <svg
      viewBox="0 0 660 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id={`${id}-g_R_outer`} x1="157" y1="22" x2="157" y2="166" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ebe6d3" />
          <stop offset="100%" stopColor="#8e865f" />
        </linearGradient>
        <linearGradient id={`${id}-gR_01`} x1="157" y1="22" x2="153" y2="157" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#dfd9c1" />
          <stop offset="100%" stopColor="#928a64" />
        </linearGradient>
        <linearGradient id={`${id}-gR_12`} x1="103" y1="10" x2="153" y2="157" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fdfbf3" />
          <stop offset="40%" stopColor="#e4ded0" />
          <stop offset="100%" stopColor="#b4ac91" />
        </linearGradient>
        <linearGradient id={`${id}-gR_23`} x1="103" y1="10" x2="115" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b835e" />
          <stop offset="100%" stopColor="#554d32" />
        </linearGradient>
        <linearGradient id={`${id}-gR_34`} x1="54" y1="13" x2="153" y2="157" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fdfbf3" />
          <stop offset="45%" stopColor="#e6dfce" />
          <stop offset="100%" stopColor="#b8af94" />
        </linearGradient>
        <linearGradient id={`${id}-gR_45`} x1="54" y1="13" x2="85" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#787050" />
          <stop offset="100%" stopColor="#38321e" />
        </linearGradient>

        <linearGradient id={`${id}-g_L_outer`} x1="13" y1="166" x2="13" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ebe6d3" />
          <stop offset="100%" stopColor="#8e865f" />
        </linearGradient>
        <linearGradient id={`${id}-gL_01`} x1="13" y1="166" x2="17" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#dfd9c1" />
          <stop offset="100%" stopColor="#928a64" />
        </linearGradient>
        <linearGradient id={`${id}-gL_12`} x1="66" y1="177" x2="17" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fdfbf3" />
          <stop offset="40%" stopColor="#e4ded0" />
          <stop offset="100%" stopColor="#b4ac91" />
        </linearGradient>
        <linearGradient id={`${id}-gL_23`} x1="66" y1="177" x2="55" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b835e" />
          <stop offset="100%" stopColor="#554d32" />
        </linearGradient>
        <linearGradient id={`${id}-gL_34`} x1="115" y1="174" x2="17" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fdfbf3" />
          <stop offset="45%" stopColor="#e6dfce" />
          <stop offset="100%" stopColor="#b8af94" />
        </linearGradient>
        <linearGradient id={`${id}-gL_45`} x1="115" y1="174" x2="85" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#787050" />
          <stop offset="100%" stopColor="#38321e" />
        </linearGradient>

        <linearGradient id={`${id}-g_diag_ribbon`} x1="17" y1="30" x2="153" y2="157" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f8f4e6" />
          <stop offset="100%" stopColor="#ded7c2" />
        </linearGradient>
      </defs>

      <g transform="translate(15, 0)">
        <polygon points="13,21 17,30 13,166" fill={`url(#${id}-g_L_outer)`} />
        <polygon points="157,166 153,157 157,22" fill={`url(#${id}-g_R_outer)`} />

        <polygon points="153,157 157,22 122,52" fill={`url(#${id}-gR_01)`} />
        <polygon points="153,157 122,52 103,10" fill={`url(#${id}-gR_12)`} />
        <polygon points="153,157 103,10 90,58" fill={`url(#${id}-gR_23)`} />
        <polygon points="153,157 90,58 54,13" fill={`url(#${id}-gR_34)`} />
        <polygon points="153,157 54,13 17,30" fill={`url(#${id}-gR_45)`} />

        <polygon points="17,30 13,166 47,135" fill={`url(#${id}-gL_01)`} />
        <polygon points="17,30 47,135 66,177" fill={`url(#${id}-gL_12)`} />
        <polygon points="17,30 66,177 79,129" fill={`url(#${id}-gL_23)`} />
        <polygon points="17,30 79,129 115,174" fill={`url(#${id}-gL_34)`} />
        <polygon points="17,30 115,174 153,157" fill={`url(#${id}-gL_45)`} />

        <polygon points="17,30 153,157 149,158 15,34" fill={`url(#${id}-g_diag_ribbon)`} />

        <line x1="153" y1="157" x2="157" y2="22" stroke="#fffdf6" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <line x1="153" y1="157" x2="103" y2="10" stroke="#fffdf6" strokeWidth="2.2" strokeLinecap="round" opacity="0.95" />
        <line x1="153" y1="157" x2="54" y2="13" stroke="#fffdf6" strokeWidth="2.2" strokeLinecap="round" opacity="0.95" />

        <line x1="17" y1="30" x2="13" y2="166" stroke="#fffdf6" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <line x1="17" y1="30" x2="66" y2="177" stroke="#fffdf6" strokeWidth="2.2" strokeLinecap="round" opacity="0.95" />
        <line x1="17" y1="30" x2="115" y2="174" stroke="#fffdf6" strokeWidth="2.2" strokeLinecap="round" opacity="0.95" />

        <line x1="17" y1="30" x2="153" y2="157" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" opacity="1" />
        <line x1="13" y1="21" x2="13" y2="166" stroke="#fffdf6" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <line x1="157" y1="22" x2="157" y2="166" stroke="#fffdf6" strokeWidth="2" strokeLinecap="round" opacity="0.9" />

        <circle cx="54" cy="13" r="1.8" fill="#fffdf6" />
        <circle cx="103" cy="10" r="1.8" fill="#fffdf6" />
        <circle cx="157" cy="22" r="1.6" fill="#fffdf6" />
        <circle cx="13" cy="21" r="1.6" fill="#fffdf6" />
        <circle cx="66" cy="177" r="1.8" fill="#fffdf6" />
        <circle cx="115" cy="174" r="1.8" fill="#fffdf6" />
        <circle cx="13" cy="166" r="1.6" fill="#fffdf6" />
        <circle cx="157" cy="166" r="1.6" fill="#fffdf6" />
      </g>

      <text
        x="215"
        y="134"
        fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
        fontSize="122"
        fontWeight="300"
        letterSpacing="-1.5"
        fill={textColor}
      >
        Noteful
      </text>
    </svg>
  );
}

export default NotefulLogo;
