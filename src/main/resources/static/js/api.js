document.addEventListener('DOMContentLoaded', () => {
    const countries = document.querySelectorAll('#svgContainer');
    const infoContainer = document.getElementById('infoContainer');
    let currCountryId = null;

    countries.forEach(country => {
        country.addEventListener('click', async (event) => {
            const countryId = event.target.id;
            const countryName = getCountryName(countryId);

            if (currCountryId == countryId) {
                infoContainer.style.display = 'none';
                currCountryId = null;
                return;
            }

            try {
                const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
                const data = await response.json();
                getCountryInfo(data[0], event.pageX, event.pageY);
                currCountryId = countryId;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        });
    });


    function getCountryInfo(country, x, y) {
        infoContainer.innerHTML = `
        <p>Name: ${country.name.common}</p>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Currency: ${country.currencies ? Object.keys(country.currencies)[0] : 'N/A'}</p>
        <p>Region: ${country.region}</p>
        <p>Timezone: ${country.timezones ? country.timezones[0] : 'N/A'}</p>
        <p style="text-align: center;"><img src="${country.flags.svg}" alt="Flag of ${country.name.common}" width="70" ></p>
`;

        // TODO: repair edge case where infoContainer exceeds page bounds
        requestAnimationFrame(() => {
            const infoContainerWidth = infoContainer.offsetWidth;
            const infoContainerHeight = infoContainer.offsetHeight;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            if (x + infoContainerWidth > viewportWidth) {
                x = viewportWidth - infoContainerWidth - 10;
            }
            if (y + infoContainerHeight > viewportHeight) {
                y = viewportHeight - infoContainerHeight - 10;
            }
            if (x < 0) {
                x = 10;
            }
            if (y < 0) {
                y = 10;
            }

            infoContainer.style.display = 'block';
            infoContainer.style.left = `${x}px`;
            infoContainer.style.top = `${y}px`;
            infoContainer.style.animation = 'none';
            infoContainer.offsetHeight;
            infoContainer.style.animation = 'popUp 0.2s ease-out';
        });
    }

    function getCountryName(id) {
        const countryMap = {
            AF: 'Afghanistan',
            AL: 'Albania',
            DZ: 'Algeria',
            AS: 'American Samoa',
            AD: 'Andorra',
            AO: 'Angola',
            AI: 'Anguilla',
            AQ: 'Antarctica',
            AG: 'Antigua and Barbuda',
            AR: 'Argentina',
            AM: 'Armenia',
            AW: 'Aruba',
            AU: 'Australia',
            AT: 'Austria',
            AZ: 'Azerbaijan',
            BS: 'Bahamas',
            BH: 'Bahrain',
            BD: 'Bangladesh',
            BB: 'Barbados',
            BY: 'Belarus',
            BE: 'Belgium',
            BZ: 'Belize',
            BJ: 'Benin',
            BM: 'Bermuda',
            BT: 'Bhutan',
            BO: 'Bolivia',
            BA: 'Bosnia and Herzegovina',
            BW: 'Botswana',
            BR: 'Brazil',
            IO: 'British Indian Ocean Territory',
            VG: 'British Virgin Islands',
            BN: 'Brunei',
            BG: 'Bulgaria',
            BF: 'Burkina Faso',
            BI: 'Burundi',
            CV: 'Cabo Verde',
            KH: 'Cambodia',
            CM: 'Cameroon',
            CA: 'Canada',
            KY: 'Cayman Islands',
            CF: 'Central African Republic',
            TD: 'Chad',
            CL: 'Chile',
            CN: 'China',
            CX: 'Christmas Island',
            CC: 'Cocos (Keeling) Islands',
            CO: 'Colombia',
            KM: 'Comoros',
            CK: 'Cook Islands',
            CR: 'Costa Rica',
            HR: 'Croatia',
            CU: 'Cuba',
            CW: 'Curaçao',
            CY: 'Cyprus',
            CZ: 'Czechia',
            CD: 'Democratic Republic of the Congo',
            DK: 'Denmark',
            DJ: 'Djibouti',
            DM: 'Dominica',
            DO: 'Dominican Republic',
            EC: 'Ecuador',
            EG: 'Egypt',
            SV: 'El Salvador',
            GQ: 'Equatorial Guinea',
            ER: 'Eritrea',
            EE: 'Estonia',
            SZ: 'Eswatini',
            ET: 'Ethiopia',
            FK: 'Falkland Islands',
            FO: 'Faroe Islands',
            FJ: 'Fiji',
            FI: 'Finland',
            FR: 'France',
            GF: 'French Guiana',
            PF: 'French Polynesia',
            GA: 'Gabon',
            GM: 'Gambia',
            GE: 'Georgia',
            DE: 'Germany',
            GH: 'Ghana',
            GI: 'Gibraltar',
            GR: 'Greece',
            GL: 'Greenland',
            GD: 'Grenada',
            GP: 'Guadeloupe',
            GU: 'Guam',
            GT: 'Guatemala',
            GG: 'Guernsey',
            GN: 'Guinea',
            GW: 'Guinea-Bissau',
            GY: 'Guyana',
            HT: 'Haiti',
            HN: 'Honduras',
            HK: 'Hong Kong',
            HU: 'Hungary',
            IS: 'Iceland',
            IN: 'India',
            ID: 'Indonesia',
            IR: 'Iran',
            IQ: 'Iraq',
            IE: 'Ireland',
            IM: 'Isle of Man',
            IL: 'Israel',
            IT: 'Italy',
            CI: 'Ivory Coast',
            JM: 'Jamaica',
            JP: 'Japan',
            JE: 'Jersey',
            JO: 'Jordan',
            KZ: 'Kazakhstan',
            KE: 'Kenya',
            KI: 'Kiribati',
            XK: 'Kosovo',
            KW: 'Kuwait',
            KG: 'Kyrgyzstan',
            LA: 'Laos',
            LV: 'Latvia',
            LB: 'Lebanon',
            LS: 'Lesotho',
            LR: 'Liberia',
            LY: 'Libya',
            LI: 'Liechtenstein',
            LT: 'Lithuania',
            LU: 'Luxembourg',
            MO: 'Macao',
            MG: 'Madagascar',
            MW: 'Malawi',
            MY: 'Malaysia',
            MV: 'Maldives',
            ML: 'Mali',
            MT: 'Malta',
            MH: 'Marshall Islands',
            MQ: 'Martinique',
            MR: 'Mauritania',
            MU: 'Mauritius',
            YT: 'Mayotte',
            MX: 'Mexico',
            FM: 'Micronesia',
            MD: 'Moldova',
            MC: 'Monaco',
            MN: 'Mongolia',
            ME: 'Montenegro',
            MS: 'Montserrat',
            MA: 'Morocco',
            MZ: 'Mozambique',
            MM: 'Myanmar',
            NA: 'Namibia',
            NR: 'Nauru',
            NP: 'Nepal',
            NL: 'Netherlands',
            NC: 'New Caledonia',
            NZ: 'New Zealand',
            NI: 'Nicaragua',
            NE: 'Niger',
            NG: 'Nigeria',
            NU: 'Niue',
            NF: 'Norfolk Island',
            KP: 'North Korea',
            MK: 'North Macedonia',
            MP: 'Northern Mariana Islands',
            NO: 'Norway',
            OM: 'Oman',
            PK: 'Pakistan',
            PW: 'Palau',
            PS: 'Palestine',
            PA: 'Panama',
            PG: 'Papua New Guinea',
            PY: 'Paraguay',
            PE: 'Peru',
            PH: 'Philippines',
            PN: 'Pitcairn Islands',
            PL: 'Poland',
            PT: 'Portugal',
            PR: 'Puerto Rico',
            QA: 'Qatar',
            CG: 'Republic of the Congo',
            RE: 'Réunion',
            RO: 'Romania',
            RU: 'Russia',
            RW: 'Rwanda',
            BL: 'Saint Barthélemy',
            SH: 'Saint Helena',
            KN: 'Saint Kitts and Nevis',
            LC: 'Saint Lucia',
            MF: 'Saint Martin',
            PM: 'Saint Pierre and Miquelon',
            VC: 'Saint Vincent and the Grenadines',
            WS: 'Samoa',
            SM: 'San Marino',
            ST: 'São Tomé and Príncipe',
            SA: 'Saudi Arabia',
            SN: 'Senegal',
            RS: 'Serbia',
            SC: 'Seychelles',
            SL: 'Sierra Leone',
            SG: 'Singapore',
            SX: 'Sint Maarten',
            SK: 'Slovakia',
            SI: 'Slovenia',
            SB: 'Solomon Islands',
            SO: 'Somalia',
            ZA: 'South Africa',
            KR: 'South Korea',
            SS: 'South Sudan',
            ES: 'Spain',
            LK: 'Sri Lanka',
            SD: 'Sudan',
            SR: 'Suriname',
            SJ: 'Svalbard og Jan Mayen',
            SE: 'Sweden',
            CH: 'Switzerland',
            SY: 'Syria',
            TW: 'Taiwan',
            TJ: 'Tajikistan',
            TZ: 'Tanzania',
            TH: 'Thailand',
            TL: 'Timor-Leste',
            TG: 'Togo',
            TK: 'Tokelau',
            TO: 'Tonga',
            TT: 'Trinidad and Tobago',
            TN: 'Tunisia',
            TR: 'Turkey',
            TM: 'Turkmenistan',
            TC: 'Turks and Caicos Islands',
            TV: 'Tuvalu',
            UG: 'Uganda',
            UA: 'Ukraine',
            AE: 'United Arab Emirates',
            GB: 'United Kingdom',
            US: 'United States of America',
            UY: 'Uruguay',
            UZ: 'Uzbekistan',
            VU: 'Vanuatu',
            VA: 'Vatican City',
            VE: 'Venezuela',
            VN: 'Vietnam',
            WF: 'Wallis and Futuna',
            EH: 'Western Sahara',
            YE: 'Yemen',
            ZM: 'Zambia',
            ZW: 'Zimbabwe'
        };
        return countryMap[id];
    }
});