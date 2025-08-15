import { useTranslation } from 'react-i18next';
import { FaUsers, FaLightbulb, FaBullseye, FaHandshake, FaChartLine, FaUniversalAccess } from 'react-icons/fa';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {t('aboutUs', 'About Us')}
        </h1>
        <p className="text-gray-600">
          {t('aboutDescription', 'The Government Scheme Eligibility Assistant is an initiative by the Government of India to help citizens discover welfare schemes they are eligible for.')}
        </p>
      </div>

      {/* Mission and Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="bg-[#13518e] p-3 rounded-full text-white mr-4">
              <FaLightbulb size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {t('aboutMission', 'Our Mission')}
            </h2>
          </div>
          <p className="text-gray-600">
            {t('aboutMissionText', 'To simplify access to government welfare schemes and ensure that every eligible citizen can benefit from them.')}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="bg-[#13518e] p-3 rounded-full text-white mr-4">
              <FaChartLine size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {t('aboutVision', 'Our Vision')}
            </h2>
          </div>
          <p className="text-gray-600">
            {t('aboutVisionText', 'A future where every Indian citizen is aware of and can easily access the welfare schemes designed for their benefit.')}
          </p>
        </div>
      </div>

      {/* Objectives */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {t('aboutObjectives', 'Our Objectives')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start">
              <div className="bg-[#13518e] p-2 rounded-full text-white mr-3">
                <FaUsers size={16} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">
                  {t('objectiveAwareness', 'Increase Awareness')}
                </h3>
                <p className="text-sm text-gray-600">
                  {t('objectiveAwarenessText', 'Educate citizens about the various welfare schemes available to them.')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start">
              <div className="bg-[#13518e] p-2 rounded-full text-white mr-3">
                <FaUniversalAccess size={16} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">
                  {t('objectiveAccessibility', 'Improve Accessibility')}
                </h3>
                <p className="text-sm text-gray-600">
                  {t('objectiveAccessibilityText', 'Make information about schemes accessible to all citizens regardless of location or language.')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start">
              <div className="bg-[#13518e] p-2 rounded-full text-white mr-3">
                <FaHandshake size={16} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">
                  {t('objectiveEnrollment', 'Facilitate Enrollment')}
                </h3>
                <p className="text-sm text-gray-600">
                  {t('objectiveEnrollmentText', 'Guide citizens through the application process for schemes they are eligible for.')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start">
              <div className="bg-[#13518e] p-2 rounded-full text-white mr-3">
                <FaBullseye size={16} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">
                  {t('objectiveTransparency', 'Ensure Transparency')}
                </h3>
                <p className="text-sm text-gray-600">
                  {t('objectiveTransparencyText', 'Provide clear and accurate information about eligibility criteria and benefits.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Government Initiatives */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {t('governmentInitiatives', 'Government Initiatives')}
        </h2>
        <p className="text-gray-600 mb-4">
          {t('governmentInitiativesText1', 'This platform is part of the Digital India initiative, aimed at empowering citizens through technology and making governance more accessible.')}
        </p>
        <p className="text-gray-600">
          {t('governmentInitiativesText2', 'We are committed to continuously improving this platform based on user feedback and evolving needs of the citizens.')}
        </p>
      </div>
    </div>
  );
};

export default About;
