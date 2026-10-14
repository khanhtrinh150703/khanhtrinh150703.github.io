import { FALLBACK_IMAGE } from '../../constants';
import { Profile } from '../../interfaces/profile';
import { SanitizedThemeConfig } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';
import LazyImage from '../lazy-image';
import ThemeChanger from '../theme-changer';

interface AvatarCardProps {
  profile: Profile | null;
  loading: boolean;
  avatarRing: boolean;
  resumeFileUrl?: string;
  dateOfBirth?: string;
  description?: string;
  theme: string;
  setTheme: (theme: string) => void;
  themeConfig: SanitizedThemeConfig;
}

const AvatarCard: React.FC<AvatarCardProps> = ({
  profile,
  loading,
  avatarRing,
  resumeFileUrl,
  dateOfBirth,
  description,
  themeConfig,
  setTheme,
  theme,
}): JSX.Element => {
  return (
    <div className="relative card shadow-lg compact bg-base-100">
      {/* Theme changer in top-right corner */}
      {!themeConfig.disableSwitch && (
        <div className="absolute top-4 right-4">
          <ThemeChanger
            theme={theme}
            setTheme={setTheme}
            loading={loading}
            themeConfig={themeConfig}
          />
        </div>
      )}

      <div className="grid place-items-center py-8">
        {loading || !profile ? (
          <div className="avatar opacity-90">
            <div className="mb-8 rounded-full w-32 h-32">
              {skeleton({ widthCls: 'w-full', heightCls: 'h-full' })}
            </div>
          </div>
        ) : (
          <div className="avatar opacity-90">
            <div
              className={`mb-8 rounded-full w-32 h-32 ${
                avatarRing
                  ? 'ring ring-primary ring-offset-base-100 ring-offset-2'
                  : ''
              }`}
            >
              <LazyImage
                src={profile.avatar || FALLBACK_IMAGE}
                alt={profile.name}
                placeholder={skeleton({
                  widthCls: 'w-full',
                  heightCls: 'h-full',
                })}
              />
            </div>
          </div>
        )}

        {/* User name */}
        <div className="text-center mx-auto px-8">
          <h5 className="font-bold text-2xl">
            {loading || !profile ? (
              skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">
                {profile.name}
              </span>
            )}
          </h5>
        </div>

        {/* Date of birth */}
        {dateOfBirth && (
          <div className="text-center mx-auto px-8 mt-2">
            {loading ? (
              skeleton({ widthCls: 'w-48', heightCls: 'h-6' })
            ) : (
              <span className="text-sm opacity-70">{dateOfBirth}</span>
            )}
          </div>
        )}

        {/* Description */}
        {description && (
          <div className="text-center mx-auto px-8 mt-2">
            {loading ? (
              skeleton({ widthCls: 'w-48', heightCls: 'h-6' })
            ) : (
              <span className="text-sm opacity-70">{description}</span>
            )}
          </div>
        )}

        {/* Resume download button */}
        {resumeFileUrl && (
          <div className="mt-6">
            {loading ? (
              skeleton({ widthCls: 'w-40', heightCls: 'h-8' })
            ) : (
              <a
                href={resumeFileUrl}
                target="_blank"
                className="btn btn-outline btn-sm text-xs opacity-50"
                download
                rel="noreferrer"
              >
                Download Resume
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarCard;
