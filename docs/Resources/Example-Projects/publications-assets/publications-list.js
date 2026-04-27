// src/data/publications.js
// Add new publications here — they will automatically appear in chronological order on the timeline.
// Set year: null and month: null for "In Press" entries.

const publications = [
  {
    id: 1,
    year: 2021,
    month: 4, // April
    title:
      "Design and Testing of Stimulation and Myoelectric Recording Modules in an Implanted Distributed Neuroprosthetic System",
    authors:
      "Makowski N, Campean A, Lambrecht J, Buckett J, Coburn J, Hart R, Miller M, Montague F, Crish T, Fu M, Kilgore K, Peckham PH, Smith B",
    journal: "IEEE Trans Biomed Circuits Syst",
    details: "2021 Apr;15(2):281-293",
    doi: "10.1109/TBCAS.2021.3066838",
    pmid: "33729949",
    pmcid: "PMC8344369",
    url: "https://doi.org/10.1109/TBCAS.2021.3066838",
  },
  {
    id: 2,
    year: 2026,
    month: 1, // January
    title:
      "The Sixth Bioelectronic Medicine Summit: Neurotechnologies for Individuals and Communities",
    authors:
      "Bahadir S, Robinson JT, Morse LR, Yoo PB, Kern R, Makowski NS, Kozai TDY, Fudim M, Barbe MF, Lim HH, Chang EH, Zanos S",
    journal: "Bioelectronic Medicine",
    details: "2026;12:3",
    doi: "10.1186/s42234-025-00195-4",
    pmid: null,
    pmcid: "PMC12849451",
    url: "https://doi.org/10.1186/s42234-025-00195-4",
  },
  {
    id: 3,
    year: 2025,
    month: 11, // November
    title: "Building and Sustaining Open-Source Medical Device Projects",
    authors: "Baldwin A, Elyahoodayan S, Gunalan P, Pikov V, Meng E",
    journal: "IEEE Transactions on Biomedical Engineering",
    details: "vol. 72, no. 11, pp. 3159-3173, Nov. 2025",
    doi: "10.1109/TBME.2025.3563102",
    pmid: null,
    pmcid: null,
    url: "https://doi.org/10.1109/TBME.2025.3563102",
  },
  {
    id: 4,
    year: 2020,
    month: 6, // June
    title: "Powering strategies for implanted multi-function neuroprostheses for spinal cord injury",
    authors: "Kilgore KL, Smith B, Campean A, Hart RL, Lambrecht JM, Buckett JR, Peckham PH",
    journal: "Healthc Technol Lett",
    details: "2020 Jun 24;7(3):81-86",
    doi: "10.1049/htl.2019.0113",
    pmid: "32754342",
    pmcid: "PMC7353817",
    url: "https://doi.org/10.1049/htl.2019.0113",
  },
  {
    id: 5,
    year: 2001,
    month: 10, // October
    title: "Efficacy of an implanted neuroprosthesis for restoring hand grasp in tetraplegia: a multicenter study",
    authors: "Peckham PH, Keith MW, Kilgore KL, Grill JH, Wuolle KS, Thrope GB, Gorman P, Hobby J, Mulcahey MJ, Carroll S, Hentz VR, Wiegner A",
    journal: "Arch Phys Med Rehabil",
    details: "2001 Oct;82:1380-1388",
    doi: "10.1053/apmr.2001.25910",
    pmid: "11588741",
    pmcid: null,
    url: "https://doi.org/10.1053/apmr.2001.25910",
  },


  {
    id: 8,
    year: 2011,
    month: null,
    title: "Corrosion of silver-cored Co-20Cr-35Ni-10Mo composite for networked neuroprosthetic system",
    authors: "Ha HM, Payer JH",
    journal: "Corrosion",
    details: "67(4):046002, 2011",
    doi: null,
    pmid: null,
    pmcid: null,
    url: null,
  },

  {
    id: 10,
    year: 2008,
    month: null,
    title: "Tension and fatigue behavior of 316LVM 1×7 multi-strand cables used as implantable electrodes",
    authors: "Lewandowski JJ, Varadarajan R, Smith B, Tuma C, Shazly M, Vatamanu LO",
    journal: "J Mater Sci Eng A",
    details: "486(1-2), pp. 447-454, 2008",
    doi: null,
    pmid: null,
    pmcid: "PMC2699296",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2699296/",
  },
  {
    id: 11,
    year: 2008,
    month: null,
    title: "Tension and fatigue behavior of silver-cored composite multi-strand cables used as implantable electrodes",
    authors: "Lewandowski JJ, Varadarajan R, Smith B",
    journal: "J Mater Sci Eng A",
    details: "492, pp. 191-198, 2008",
    doi: null,
    pmid: null,
    pmcid: null,
    url: null,
  },
  {
    id: 12,
    year: 2011,
    month: 2, // February
    title: "Design and testing of an advanced implantable neuroprosthesis with myoelectric control",
    authors: "Hart RL, Bhadra N, Montague FW, Kilgore KL, Peckham PH",
    journal: "IEEE Trans Neural Syst Rehabil Eng",
    details: "2011 Feb;19(1):45-53",
    doi: "10.1109/TNSRE.2010.2079952",
    pmid: "20876029",
    pmcid: null,
    url: "https://doi.org/10.1109/TNSRE.2010.2079952",
  },
  {
    id: 13,
    year: 2019,
    month: 7, // July (published online)
    title: "Risk-benefit value of upper extremity function by an implanted electrical stimulation device targeting chronic cervical spinal cord injury",
    authors: "Anderson KD, Bryden AM, Moynahan M",
    journal: "Spinal Cord Series and Cases",
    details: "2019;5(1):79",
    doi: "10.1038/s41394-019-0213-9",
    pmid: "31632726",
    pmcid: "PMC6786403",
    url: "https://doi.org/10.1038/s41394-019-0213-9",
  },
  {
    id: 14,
    year: 2019,
    month: 2, // February
    title: "Design and testing of a 96-channel neural interface module for the Networked Neuroprosthesis system",
    authors: "Bullard AJ, Nason SR, Irwin ZT, Nu CS, Smith B, Campean A, Peckham PH, Kilgore KL, Willsey MS, Patil PG, Chestek CA",
    journal: "Bioelectronic Medicine",
    details: "2019;5:3",
    doi: "10.1186/s42234-019-0019-x",
    pmid: "32232094",
    pmcid: null,
    url: "https://doi.org/10.1186/s42234-019-0019-x",
  },
  {
    id: 15,
    year: 2023,
    month: 10, // October
    title: "Neuroprosthesis for individuals with spinal cord injury",
    authors: "Kilgore KL, Anderson KD, Peckham PH",
    journal: "Neurological Research",
    details: "2023 Oct;45(10):893-905",
    doi: "10.1080/01616412.2020.1798106",
    pmid: "32727296",
    pmcid: "PMC9415059",
    url: "https://doi.org/10.1080/01616412.2020.1798106",
  },
  {
    id: 16,
    year: 2024,
    month: 6, // June
    title: "Anatomical Registration of Implanted Sensors Improves Accuracy of Trunk Tilt Estimates with a Networked Neuroprosthesis",
    authors: "Morrison MW, Miller ME, Lombardo LM, Triolo RJ, Audu ML",
    journal: "Sensors (Basel)",
    details: "2024 Jun 13;24(12):3816",
    doi: "10.3390/s24123816",
    pmid: "38931600",
    pmcid: null,
    url: "https://doi.org/10.3390/s24123816",
  },
];

export default publications;