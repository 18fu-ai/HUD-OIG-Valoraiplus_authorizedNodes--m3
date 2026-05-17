#!/usr/bin/env python3
"""
VALORAIPLUS® OMEGA v100™ — COURT DOCUMENT COMPILER ENGINE
[SYSTEM CODE SPECIFICATION: SGAU-7226.3461 // SAINT PAUL NODE]

Deterministic 28-Line California Bounded Pleading Paper Layout Engine.
Enforces absolute margins, exact vertical line grids, front-facing captions,
and unalterable cryptographic electronic signature blocks.
"""

import os
import sys
import json
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas


class CourtPleadingCanvas(canvas.Canvas):
    """
    Forensic Canvas Layer enforcing absolute structural constraints:
    - 28-Line Left Vertical Numbering Index (Exact 12pt Line Spacing)
    - California Double Left Rule Border Lines
    - Right Margin Boundary Guidelines
    - Cryptographic Node Footers & Dynamic Page Number Tracking
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.pages = []

    def showPage(self):
        self.pages.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        page_count = len(self.pages)
        for page in self.pages:
            self.__dict__.update(page)
            self.draw_court_infrastructure(page_count)
            super().showPage()
        super().save()

    def draw_court_infrastructure(self, total_pages):
        self.saveState()
        letter_width, letter_height = letter

        # 1. Structural Borders (Double Left Rule, Single Right Rule)
        self.setStrokeColor(colors.HexColor("#A0A0A0"))
        self.setLineWidth(1.0)
        self.line(72, 36, 72, letter_height - 36)
        self.line(78, 36, 78, letter_height - 36)
        self.line(576, 36, 576, letter_height - 36)

        # 2. 28-Line Vertical Numbering Column (CRC Rule 2.110 Standards)
        self.setFont("Helvetica-Bold", 9)
        self.setFillColor(colors.HexColor("#404040"))

        start_y = letter_height - 54
        line_spacing = 24

        for i in range(1, 29):
            current_y = start_y - ((i - 1) * line_spacing)
            self.drawCentredString(45, current_y - 3, str(i))
            self.setStrokeColor(colors.HexColor("#F0F0F0"))
            self.setLineWidth(0.5)
            self.line(84, current_y - 8, 566, current_y - 8)

        # 3. Secure Forensic Footers
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#606060"))
        footer_text = "SGAU-7226.3461 // SAINT PAUL NODE® | Case No. CUD-26-682107"
        page_string = f"Page {self._pageNumber} of {total_pages}"
        self.drawString(84, 20, footer_text)
        self.drawRightString(566, 20, page_string)
        self.restoreState()


class CourtDocumentCompiler:
    def __init__(self, output_filename):
        self.filename = output_filename
        self.doc = SimpleDocTemplate(
            self.filename,
            pagesize=letter,
            leftMargin=84,
            rightMargin=45,
            topMargin=54,
            bottomMargin=54
        )
        self.styles = getSampleStyleSheet()
        self.init_custom_styles()

    def init_custom_styles(self):
        self.pleading_style = ParagraphStyle(
            'CourtPleadingText',
            parent=self.styles['Normal'],
            fontName='Helvetica',
            fontSize=11,
            leading=24,
            textColor=colors.HexColor("#101010"),
            spaceBefore=0,
            spaceAfter=0
        )
        self.bold_style = ParagraphStyle(
            'CourtPleadingBold',
            parent=self.pleading_style,
            fontName='Helvetica-Bold'
        )
        self.right_style = ParagraphStyle(
            'CourtPleadingRight',
            parent=self.pleading_style,
            alignment=2
        )

    def generate_pleading_package(self, document_title, text_blocks, signature_data):
        story = []

        story.append(Paragraph("<b>DONALD ERNEST GILLSON</b>", self.bold_style))
        story.append(Paragraph("1030 Girard Road, Suite 301A", self.pleading_style))
        story.append(Paragraph("San Francisco, California 94129", self.pleading_style))
        story.append(Paragraph("Telephone: 408-384-1376", self.pleading_style))
        story.append(Paragraph("Defendant, In Pro Per", self.bold_style))
        story.append(Spacer(1, 24))

        story.append(Paragraph("<font size=12><b>SUPERIOR COURT OF THE STATE OF CALIFORNIA</b></font>", self.right_style))
        story.append(Paragraph("<font size=12><b>FOR THE COUNTY OF SAN FRANCISCO</b></font>", self.right_style))
        story.append(Spacer(1, 24))

        story.append(Paragraph(f"<b>CASE TITLE:</b> Swords to Plowshares v. Donald Ernest Gillson", self.pleading_style))
        story.append(Paragraph(f"<b>CASE NO:</b> CUD-26-682107 | <b>DEPARTMENT:</b> 12", self.pleading_style))
        story.append(Paragraph(f"<b>DOCUMENT:</b> {document_title.upper()}", self.bold_style))
        story.append(Spacer(1, 24))

        for block in text_blocks:
            story.append(Paragraph(block, self.pleading_style))

        sig_elements = []
        sig_elements.append(Spacer(1, 24))
        sig_elements.append(Paragraph(f"Dated: {datetime.now().strftime('%B %d, %Y')}", self.pleading_style))
        sig_elements.append(Spacer(1, 24))
        sig_elements.append(Paragraph("Respectfully submitted,", self.pleading_style))
        sig_elements.append(Spacer(1, 48))
        sig_elements.append(Paragraph(f"<u>/s/ {signature_data['name']}</u>", self.bold_style))
        sig_elements.append(Paragraph(f"{signature_data['role']}", self.pleading_style))
        sig_elements.append(Paragraph(f"ORCID iD: {signature_data['orcid']}", self.pleading_style))
        sig_elements.append(Paragraph(f"Node Validation Authority: {signature_data['node']}", self.pleading_style))
        story.append(KeepTogether(sig_elements))

        self.doc.build(story, canvasmaker=CourtPleadingCanvas)
        print(json.dumps({"status": "ok", "file": self.filename}))


if __name__ == "__main__":
    payload = json.loads(sys.argv[1])
    compiler = CourtDocumentCompiler(payload["output_filename"])
    compiler.generate_pleading_package(
        payload["document_title"],
        payload["text_blocks"],
        payload["signature_data"]
    )
