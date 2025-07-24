package com.example.world.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@CrossOrigin(origins = "https://worldexpo.netlify.app")
@RestController
@RequestMapping("/api")
public class APIController {

    private final RestTemplate restTemplate = new RestTemplate();
    private Set<String> visitedCountries = new HashSet<>();

    @GetMapping("/visited-countries")
    public Set<String> getVisitedCountries() {
        return visitedCountries;
    }

    @PostMapping("/visited-countries")
    public void saveVisitedCountries(@RequestBody Set<String> countries) {
        visitedCountries = countries;
    }

    @GetMapping("/country-info/{countryId}")
    public ResponseEntity<Object> getCountryInfo(@PathVariable String countryId) {
        String countryName = getCountryName(countryId);
        String url = "https://restcountries.com/v3.1/name/" + countryName;

        Object[] countries = restTemplate.getForObject(url, Object[].class);
        if (countries != null && countries.length > 0) {
            return ResponseEntity.ok(countries[0]);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private String getCountryName(String id) {
        return switch (id) {
            case "AF" -> "Afghanistan";
            case "AL" -> "Albania";
            case "DZ" -> "Algeria";
            case "AS" -> "American Samoa";
            case "AD" -> "Andorra";
            case "AO" -> "Angola";
            case "AI" -> "Anguilla";
            case "AQ" -> "Antarctica";
            case "AG" -> "Antigua and Barbuda";
            case "AR" -> "Argentina";
            case "AM" -> "Armenia";
            case "AW" -> "Aruba";
            case "AU" -> "Australia";
            case "AT" -> "Austria";
            case "AZ" -> "Azerbaijan";
            case "BS" -> "Bahamas";
            case "BH" -> "Bahrain";
            case "BD" -> "Bangladesh";
            case "BB" -> "Barbados";
            case "BY" -> "Belarus";
            case "BE" -> "Belgium";
            case "BZ" -> "Belize";
            case "BJ" -> "Benin";
            case "BM" -> "Bermuda";
            case "BT" -> "Bhutan";
            case "BO" -> "Bolivia";
            case "BA" -> "Bosnia and Herzegovina";
            case "BW" -> "Botswana";
            case "BR" -> "Brazil";
            case "IO" -> "British Indian Ocean Territory";
            case "VG" -> "British Virgin Islands";
            case "BN" -> "Brunei";
            case "BG" -> "Bulgaria";
            case "BF" -> "Burkina Faso";
            case "BI" -> "Burundi";
            case "CV" -> "Cabo Verde";
            case "KH" -> "Cambodia";
            case "CM" -> "Cameroon";
            case "CA" -> "Canada";
            case "KY" -> "Cayman Islands";
            case "CF" -> "Central African Republic";
            case "TD" -> "Chad";
            case "CL" -> "Chile";
            case "CN" -> "China";
            case "CX" -> "Christmas Island";
            case "CC" -> "Cocos (Keeling) Islands";
            case "CO" -> "Colombia";
            case "KM" -> "Comoros";
            case "CK" -> "Cook Islands";
            case "CR" -> "Costa Rica";
            case "HR" -> "Croatia";
            case "CU" -> "Cuba";
            case "CW" -> "Curaçao";
            case "CY" -> "Cyprus";
            case "CZ" -> "Czechia";
            case "CD" -> "Democratic Republic of the Congo";
            case "DK" -> "Denmark";
            case "DJ" -> "Djibouti";
            case "DM" -> "Dominica";
            case "DO" -> "Dominican Republic";
            case "EC" -> "Ecuador";
            case "EG" -> "Egypt";
            case "SV" -> "El Salvador";
            case "GQ" -> "Equatorial Guinea";
            case "ER" -> "Eritrea";
            case "EE" -> "Estonia";
            case "SZ" -> "Eswatini";
            case "ET" -> "Ethiopia";
            case "FK" -> "Falkland Islands";
            case "FO" -> "Faroe Islands";
            case "FJ" -> "Fiji";
            case "FI" -> "Finland";
            case "FR" -> "France";
            case "GF" -> "French Guiana";
            case "PF" -> "French Polynesia";
            case "GA" -> "Gabon";
            case "GM" -> "Gambia";
            case "GE" -> "Georgia";
            case "DE" -> "Germany";
            case "GH" -> "Ghana";
            case "GI" -> "Gibraltar";
            case "GR" -> "Greece";
            case "GL" -> "Greenland";
            case "GD" -> "Grenada";
            case "GP" -> "Guadeloupe";
            case "GU" -> "Guam";
            case "GT" -> "Guatemala";
            case "GG" -> "Guernsey";
            case "GN" -> "Guinea";
            case "GW" -> "Guinea-Bissau";
            case "GY" -> "Guyana";
            case "HT" -> "Haiti";
            case "HN" -> "Honduras";
            case "HK" -> "Hong Kong";
            case "HU" -> "Hungary";
            case "IS" -> "Iceland";
            case "IN" -> "India";
            case "ID" -> "Indonesia";
            case "IR" -> "Iran";
            case "IQ" -> "Iraq";
            case "IE" -> "Ireland";
            case "IM" -> "Isle of Man";
            case "IL" -> "Israel";
            case "IT" -> "Italy";
            case "CI" -> "Ivory Coast";
            case "JM" -> "Jamaica";
            case "JP" -> "Japan";
            case "JE" -> "Jersey";
            case "JO" -> "Jordan";
            case "KZ" -> "Kazakhstan";
            case "KE" -> "Kenya";
            case "KI" -> "Kiribati";
            case "XK" -> "Kosovo";
            case "KW" -> "Kuwait";
            case "KG" -> "Kyrgyzstan";
            case "LA" -> "Laos";
            case "LV" -> "Latvia";
            case "LB" -> "Lebanon";
            case "LS" -> "Lesotho";
            case "LR" -> "Liberia";
            case "LY" -> "Libya";
            case "LI" -> "Liechtenstein";
            case "LT" -> "Lithuania";
            case "LU" -> "Luxembourg";
            case "MO" -> "Macao";
            case "MG" -> "Madagascar";
            case "MW" -> "Malawi";
            case "MY" -> "Malaysia";
            case "MV" -> "Maldives";
            case "ML" -> "Mali";
            case "MT" -> "Malta";
            case "MH" -> "Marshall Islands";
            case "MQ" -> "Martinique";
            case "MR" -> "Mauritania";
            case "MU" -> "Mauritius";
            case "YT" -> "Mayotte";
            case "MX" -> "Mexico";
            case "FM" -> "Micronesia";
            case "MD" -> "Moldova";
            case "MC" -> "Monaco";
            case "MN" -> "Mongolia";
            case "ME" -> "Montenegro";
            case "MS" -> "Montserrat";
            case "MA" -> "Morocco";
            case "MZ" -> "Mozambique";
            case "MM" -> "Myanmar";
            case "NA" -> "Namibia";
            case "NR" -> "Nauru";
            case "NP" -> "Nepal";
            case "NL" -> "Netherlands";
            case "NC" -> "New Caledonia";
            case "NZ" -> "New Zealand";
            case "NI" -> "Nicaragua";
            case "NE" -> "Niger";
            case "NG" -> "Nigeria";
            case "NU" -> "Niue";
            case "NF" -> "Norfolk Island";
            case "KP" -> "North Korea";
            case "MK" -> "North Macedonia";
            case "MP" -> "Northern Mariana Islands";
            case "NO" -> "Norway";
            case "OM" -> "Oman";
            case "PK" -> "Pakistan";
            case "PW" -> "Palau";
            case "PS" -> "Palestine";
            case "PA" -> "Panama";
            case "PG" -> "Papua New Guinea";
            case "PY" -> "Paraguay";
            case "PE" -> "Peru";
            case "PH" -> "Philippines";
            case "PN" -> "Pitcairn Islands";
            case "PL" -> "Poland";
            case "PT" -> "Portugal";
            case "PR" -> "Puerto Rico";
            case "QA" -> "Qatar";
            case "CG" -> "Republic of the Congo";
            case "RE" -> "Réunion";
            case "RO" -> "Romania";
            case "RU" -> "Russia";
            case "RW" -> "Rwanda";
            case "BL" -> "Saint Barthélemy";
            case "SH" -> "Saint Helena";
            case "KN" -> "Saint Kitts and Nevis";
            case "LC" -> "Saint Lucia";
            case "MF" -> "Saint Martin";
            case "PM" -> "Saint Pierre and Miquelon";
            case "VC" -> "Saint Vincent and the Grenadines";
            case "WS" -> "Samoa";
            case "SM" -> "San Marino";
            case "ST" -> "São Tomé and Príncipe";
            case "SA" -> "Saudi Arabia";
            case "SN" -> "Senegal";
            case "RS" -> "Serbia";
            case "SC" -> "Seychelles";
            case "SL" -> "Sierra Leone";
            case "SG" -> "Singapore";
            case "SX" -> "Sint Maarten";
            case "SK" -> "Slovakia";
            case "SI" -> "Slovenia";
            case "SB" -> "Solomon Islands";
            case "SO" -> "Somalia";
            case "ZA" -> "South Africa";
            case "KR" -> "South Korea";
            case "SS" -> "South Sudan";
            case "ES" -> "Spain";
            case "LK" -> "Sri Lanka";
            case "SD" -> "Sudan";
            case "SR" -> "Suriname";
            case "SJ" -> "Svalbard og Jan Mayen";
            case "SE" -> "Sweden";
            case "CH" -> "Switzerland";
            case "SY" -> "Syria";
            case "TW" -> "Taiwan";
            case "TJ" -> "Tajikistan";
            case "TZ" -> "Tanzania";
            case "TH" -> "Thailand";
            case "TL" -> "Timor-Leste";
            case "TG" -> "Togo";
            case "TK" -> "Tokelau";
            case "TO" -> "Tonga";
            case "TT" -> "Trinidad and Tobago";
            case "TN" -> "Tunisia";
            case "TR" -> "Turkey";
            case "TM" -> "Turkmenistan";
            case "TC" -> "Turks and Caicos Islands";
            case "TV" -> "Tuvalu";
            case "UG" -> "Uganda";
            case "UA" -> "Ukraine";
            case "AE" -> "United Arab Emirates";
            case "GB" -> "United Kingdom";
            case "US" -> "United States of America";
            case "UY" -> "Uruguay";
            case "UZ" -> "Uzbekistan";
            case "VU" -> "Vanuatu";
            case "VA" -> "Vatican City";
            case "VE" -> "Venezuela";
            case "VN" -> "Vietnam";
            case "WF" -> "Wallis and Futuna";
            case "EH" -> "Western Sahara";
            case "YE" -> "Yemen";
            case "ZM" -> "Zambia";
            case "ZW" -> "Zimbabwe";
            default -> id;
        };
    }
}
