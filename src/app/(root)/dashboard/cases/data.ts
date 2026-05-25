export interface CaseData {
  id: string;
  title: string;
  caseNumber: string;
  timeAgo: string;
  clientName: string;
  clientPhone: string;
  petOrFarm: "Pet" | "Farm";
  petName: string;
  species: string;
  breed: string;
  age: number;
  sex: "Male" | "Female";
  petNumber: string;
  confirmatoryDiagnosis: string;
  clinicalSigns: string;
  dateOccurred: string;
  dateReported: string;
  request: string;
  chiefComplaint: string;
  history: string;
  physicalExamination: string;
  differentialDiagnosis: string;
  tentativeDiagnosis: string;
  confirmatoryDiagnosisDetails: string;
  mortality: string;
  treatmentRegimen: string;
  clinicAddress: string;
  clinicName: string;
  veterinarianName: string;
  imageTaken?: string;
  datePresented?: string;
  temperature?: string;
  heartRate?: string;
  weight?: string;
  fullHistory?: string; // For the long lorem ipsum text
}

export const cases: CaseData[] = [
  {
    id: "1",
    title: "Kora's Treatment",
    caseNumber: "CS092201a",
    timeAgo: "15 mins ago",
    clientName: "Dolapo Adaba",
    clientPhone: "+2348127113987",
    petOrFarm: "Pet",
    petName: "Kora",
    species: "Canine",
    breed: "Rottweiler",
    age: 2,
    sex: "Male",
    petNumber: "Pt09456a",
    confirmatoryDiagnosis: "Helminthosis, Parasitemia",
    clinicalSigns: "Heamorrage, weight loss, lethargy...",
    dateOccurred: "16/2/2025",
    dateReported: "16/2/2025", // Keeping consistent or can be diff
    datePresented: "12/3/2025",
    request: "Routine",
    chiefComplaint: "Hemorrhage",
    history: "None",
    physicalExamination: "None",
    differentialDiagnosis: "Helminthosis, Parasitemia,...",
    tentativeDiagnosis: "Helminthosis",
    confirmatoryDiagnosisDetails: "Yes",
    mortality: "None",
    treatmentRegimen: "Oxytet 1%, Iver...",
    temperature: "37`C",
    heartRate: "120bts/min",
    weight: "36kg",
    clinicAddress: "220, Awe College Road, Ikeja, Lagos, Nigeria",
    clinicName: "VTH, University of Ibadan",
    veterinarianName: "Dr Waywealth",
    imageTaken: "View Image",
    fullHistory:
      "Lörem ipsum linat telen. Krotyrat dösam emedan megar, huruvida polyr. Niväsm negisk niligen. Multiren. Ipär dias och spebylig vasam hexalalig. Gäbens neogen. Mödat gyngar.\nNer difir myse. Hämyrade klimatsäkra ir krotiv inte begt. Tempomani hexagyn även om matbil. Tridost sper kontrav. Gäng podeng fastän runat vuvins. Semiledes sevar, reng koldioxidsänka om raktiga. Pin filasm somön i vidonat.\nLanera supramöda, pest samt diasm reass. Soss spektiga, väpp enar hånire. Os ultradade i epigt tågösk. Hemitesat nahet. Dåda apfälla avussade. Ståpaddling ninde tånat har koska. Slöjböter pissade de astrons. Du kan vara drabbad.\nUdönar olig för morotsmobb renede. Dida tinde och hynas, möbelhund. Sehet uda, fronta, deception. Decidodesk hyperstat hypogänade till androlog. Egoktigt nöras det vill säga ultragt, mögåska. Prefiledade enade, och dolig. Pende orad även om lanade nutt maledes. Du kan vara drabbad.\nPladore agflation håbessade. Ekofoni. Seskade kontrahyrade ett krod vaska monoktig. Demiosmos pseudovision men...",
  },
  {
    id: "2",
    title: "Adibala Poultry Treatment",
    caseNumber: "CS092201b",
    timeAgo: "15 mins ago",
    clientName: "Adibala Farms",
    clientPhone: "+2348100000001",
    petOrFarm: "Farm",
    petName: "Poultry Flock",
    species: "Chicken",
    breed: "Broiler",
    age: 1,
    sex: "Male",
    petNumber: "PT092201b",
    confirmatoryDiagnosis: "Viral Infection",
    clinicalSigns: "Respiratory distress, Decreased egg production",
    dateOccurred: "03/10/2023",
    dateReported: "03/18/2023",
    request: "Emergency",
    chiefComplaint: "Sudden death",
    history: "Recent introduction of new birds",
    physicalExamination: "Respiratory congestion",
    differentialDiagnosis: "Newcastle Disease",
    tentativeDiagnosis: "Avian Influenza",
    confirmatoryDiagnosisDetails: "Yes",
    mortality: "5%",
    treatmentRegimen: "Antiviral treatment",
    clinicAddress: "15, Farm Road, Ogun State, Nigeria",
    clinicName: "Agricultural Development Center",
    veterinarianName: "Dr Adebayo",
    imageTaken: "View image",
  },
];
