namespace CardManagementAPI.Models
{
    public class ContentModel
    {
        public int? Id { get; set; }

        // Card Form Labels
        public string? CardHolderLabel { get; set; }
        //public string? CardHolderPlaceholder { get; set; }

        public string? CardTypeLabel { get; set; }
        public string? CardTypeSelectDefault { get; set; }

        public string? CardNumberLabel { get; set; }
        //public string? CardNumberPlaceholder { get; set; }

        public string? CVVLabel { get; set; }
        //public string? CVVPlaceholder { get; set; }

        public string? ExpirationDateLabel { get; set; }
        //public string? ExpirationMonthPlaceholder { get; set; }
        //public string? ExpirationYearPlaceholder { get; set; }

        public string? AddressLabel { get; set; }
        //public string? AddressLine1Placeholder { get; set; }
        //public string? AddressLine2Placeholder { get; set; }

        public string? CityLabel { get; set; }
        //public string? CityPlaceholder { get; set; }

        public string? StateLabel { get; set; }
        public string? StateSelectDefault { get; set; }

        public string? ZipLabel { get; set; }
        //public string? ZipPlaceholder { get; set; }

        public string? CountryLabel { get; set; }
        public string? CountrySelectDefault { get; set; }

        public string? UseAsPrimaryCardLabel { get; set; }

        // Footer/Additional Information
        public string? FooterText { get; set; }

        // Button Text
        public string? AddCardButtonText { get; set; }
        public string? CancelButtonText { get; set; }

        // Newsletter section (if present)
        public string? NewsletterLabel { get; set; }
        //public string? NewsletterPlaceholder { get; set; }
        public string? SignUpButtonText { get; set; }

        // Survey Section (if present)
        public string? SurveyText { get; set; }
        public string? SurveyLinkText { get; set; }

        // Terms and conditions
        public string? TermsAndConditionsText { get; set; }
        public string? PrivacyPolicyText { get; set; }
    }
}
