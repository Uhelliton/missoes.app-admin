import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type {ITeam} from "@/modules/team/types/team.interface";
import {getAgeFromDate} from "@/infra/helpers/helper";

export const useTeamExportData = (data: Array<ITeam>) => {
  function exportToPDF() {
    const doc = new jsPDF();

    const teamColors: Record<string, number[]> = {
      Azul: [0, 121, 191],
      Amarelo: [255, 223, 0],
      Bege: [245, 245, 220],
      Branca: [255, 255, 255],
      Cinza: [128, 128, 128],
      Dourada: [212, 175, 55],
      Laranja: [255, 149, 46],
      Marrom: [139, 69, 19],
      Ouro: [255, 215, 0],
      Preto: [0, 0, 0],
      Prata: [192, 192, 192],
      Rosa: [255, 105, 180],
      Roxo: [128, 0, 128],
      Verde: [46, 204, 113],
      Vermelho: [235, 64, 52],
      Violeta: [143, 0, 255],
    };


    data.forEach((team, index) => {
      if (index > 0) doc.addPage();

      const teamColor = teamColors[team.color] || [0, 0, 0];
      const textColor = getContrastTextColor(teamColor)

      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0) // Define a cor do texto como preta (RGB)
      doc.text(team.name, 14, 20);


      autoTable(doc, {
        startY: 30,
        head: [['Líder']], // head: [['Sigla', 'Líder']],
        body: [[ team.leader.name]], //   body: [[team.sigla,  team.leader.name]],
        styles: {
          fontSize: 11,
          textColor: 20,
        },
        headStyles: {
          fillColor: teamColor,
          textColor: textColor,
        },
      });

      // table members
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [['#', 'Membro', 'Sexo', 'Idade', 'Igreja']],
        body: team.members.map((member, index) => [
          index  + 1,
          member.name,
          member.gender,
          getAgeFromDate(member.birthday).toString(),
          member.church.name,
        ]),
        styles: {
          fontSize: 10,
        },
        headStyles: {
          fillColor: teamColor,
          textColor: textColor,
        },
      });
    });

    doc.save('relatorio-equipes.pdf');
  }

  function getContrastTextColor([r, g, b]: number[], teamName: string): number {
    const overrideDarkText = ['Branca', 'Amarelo', 'Bege', 'Dourada', 'Prata']

    if (overrideDarkText.includes(teamName)) {
      return 0 // texto preto forçado
    }

    // Caso padrão com cálculo automático
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.5 ? 0 : 255 // 0 = preto, 255 = branco
  }

  return {
    exportToPDF
  }
}
